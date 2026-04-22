#!/usr/bin/env bash
# Gerencia migrações e geração de clients Prisma (OUCAB + AIUSCE)
#
# Uso:
#   ./scripts/db.sh generate
#   ./scripts/db.sh migrate:dev [nome]
#   ./scripts/db.sh migrate:deploy
#   ./scripts/db.sh status
#   ./scripts/db.sh reset

set -euo pipefail

# Cores
CYAN="\033[36m"; MAGENTA="\033[35m"; GREEN="\033[32m"
YELLOW="\033[33m"; RED="\033[31m"; BOLD="\033[1m"; DIM="\033[2m"; RESET="\033[0m"

sep()  { echo -e "${DIM}────────────────────────────────────────────────────────────${RESET}"; }
info() { echo -e "${CYAN}${BOLD}[INFO  ]${RESET} $*"; }
ok()   { echo -e "${GREEN}${BOLD}[  OK  ]${RESET} $*"; }
warn() { echo -e "${YELLOW}${BOLD}[ WARN ]${RESET} $*"; }
err()  { echo -e "${RED}${BOLD}[ ERRO ]${RESET} $*" >&2; exit 1; }
step() { echo -e "\n${BOLD}${CYAN}◆ $*${RESET}"; sep; }

run_oucab()  { echo -e "${CYAN}${BOLD}[OUCAB ]${RESET} ${DIM}$ $*${RESET}"; "$@"; }
run_aiusce() { echo -e "${MAGENTA}${BOLD}[AIUSCE]${RESET} ${DIM}$ $*${RESET}"; "$@"; }

cmd_generate() {
  step "Gerando Prisma Clients"
  run_oucab  npx prisma generate
  run_aiusce npx prisma generate --schema=prisma/aiusce/schema.prisma
  ok "Clients gerados."
}

cmd_migrate_dev() {
  local name="${1:-}"
  if [[ -z "$name" ]]; then
    read -rp "$(info 'Nome da migration (ex: add_campo_oculto): ')" name
  fi
  [[ -z "$name" ]] && err "Nome não informado."

  step "Migration DEV — \"$name\""
  run_oucab  npx prisma migrate dev --name "$name"
  run_aiusce npx prisma migrate dev --name "$name" --schema=prisma/aiusce/schema.prisma
  ok "Migrations aplicadas. Gerando clients..."
  cmd_generate
}

cmd_migrate_deploy() {
  step "Migration DEPLOY"
  run_oucab  npx prisma migrate deploy
  run_aiusce npx prisma migrate deploy --schema=prisma/aiusce/schema.prisma
  ok "Migrations de deploy aplicadas."
}

cmd_status() {
  step "Status das Migrations"
  run_oucab  npx prisma migrate status
  run_aiusce npx prisma migrate status --schema=prisma/aiusce/schema.prisma
}

cmd_sync() {
  local name="${1:-}"
  if [[ -z "$name" ]]; then
    read -rp "$(info 'Nome da migration (ex: add_campo_oculto): ')" name
  fi
  [[ -z "$name" ]] && err "Nome não informado."

  step "Migrate → Generate → Seed"
  run_oucab  npx prisma migrate dev --name "$name"
  run_aiusce npx prisma migrate dev --name "$name" --schema=prisma/aiusce/schema.prisma
  cmd_generate
  run_oucab  npx prisma db seed
  ok "Tudo pronto."
}

cmd_reset() {
  warn "Isso vai APAGAR todos os dados de AMBOS os bancos!"
  read -rp "$(warn 'Confirmar reset? (sim/não): ')" confirm
  [[ "$confirm" != "sim" ]] && { info "Cancelado."; exit 0; }
  step "Reset"
  run_oucab  npx prisma migrate reset --force
  run_aiusce npx prisma migrate reset --force --schema=prisma/aiusce/schema.prisma
  ok "Reset concluído."
}

help() {
  echo -e "
${BOLD}${CYAN}Prisma DB — OUCAB + AIUSCE${RESET}

  ${BOLD}Uso:${RESET}
    ./scripts/db.sh <comando> [opções]

  ${BOLD}Comandos:${RESET}
    ${GREEN}sync${RESET} [nome]          Migrate + Generate + Seed (tudo de uma vez)
    ${GREEN}generate${RESET}              Gera os Prisma Clients
    ${GREEN}migrate:dev${RESET} [nome]    Cria e aplica migration em DEV
    ${GREEN}migrate:deploy${RESET}        Aplica migrations pendentes em produção
    ${GREEN}status${RESET}                Exibe o status das migrations
    ${GREEN}reset${RESET}                 Apaga dados e recria os bancos
"
}

ACTION="${1:-}"
case "$ACTION" in
  sync)            cmd_sync "${2:-}" ;;
  generate)        cmd_generate ;;
  migrate:dev)     cmd_migrate_dev "${2:-}" ;;
  migrate:deploy)  cmd_migrate_deploy ;;
  status)          cmd_status ;;
  reset)           cmd_reset ;;
  *)               help ;;
esac
