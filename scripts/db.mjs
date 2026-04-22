#!/usr/bin/env node
/**
 * Gerenciador de banco de dados — OUCAB + AIUSCE
 *
 * Uso:
 *   node scripts/db.mjs generate
 *   node scripts/db.mjs migrate:dev [nome-da-migration]
 *   node scripts/db.mjs migrate:deploy
 *   node scripts/db.mjs reset
 *   node scripts/db.mjs status
 *
 * Atalhos npm (package.json):
 *   npm run db generate
 *   npm run db migrate:dev add_campo_x
 *   npm run db migrate:deploy
 */

import { execSync } from "node:child_process";
import { createInterface } from "node:readline";

// ---------------------------------------------------------------------------
// Cores (ANSI)
// ---------------------------------------------------------------------------
const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
};

const tag = (color, label) => `${color}${C.bold}[${label}]${C.reset}`;
const OUCAB  = tag(C.cyan,    "OUCAB ");
const AIUSCE = tag(C.magenta, "AIUSCE");
const OK     = tag(C.green,   " OK   ");
const INFO   = tag(C.blue,    " INFO ");
const WARN   = tag(C.yellow,  " WARN ");
const ERR    = tag(C.red,     "ERRO  ");
const SEP    = `${C.dim}${"─".repeat(60)}${C.reset}`;

function log(prefix, msg) { console.log(`${prefix} ${msg}`); }
function sep()            { console.log(SEP); }
function title(t)         { console.log(`\n${C.bold}${C.cyan}◆ ${t}${C.reset}`); sep(); }

// ---------------------------------------------------------------------------
// Execução de comandos
// ---------------------------------------------------------------------------
function run(label, cmd) {
  log(label, `${C.dim}$ ${cmd}${C.reset}`);
  try {
    execSync(cmd, { stdio: "inherit" });
    log(OK, `${label} concluído\n`);
  } catch {
    log(ERR, `${label} falhou`);
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Pergunta interativa
// ---------------------------------------------------------------------------
function ask(question) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, (answer) => { rl.close(); resolve(answer.trim()); });
  });
}

// ---------------------------------------------------------------------------
// Comandos
// ---------------------------------------------------------------------------
async function cmdGenerate() {
  title("Gerando Prisma Clients");
  run(OUCAB,  "npx prisma generate");
  run(AIUSCE, "npx prisma generate --schema=prisma/aiusce/schema.prisma");
  log(OK, "Ambos os clients gerados com sucesso.");
}

async function cmdMigrateDev(name) {
  if (!name) {
    name = await ask(`${INFO} Nome da migration (ex: add_campo_oculto): `);
  }
  if (!name) {
    log(WARN, "Nome não informado. Abortando.");
    process.exit(1);
  }
  title(`Migration DEV — "${name}"`);
  run(OUCAB,  `npx prisma migrate dev --name ${name}`);
  run(AIUSCE, `npx prisma migrate dev --name ${name} --schema=prisma/aiusce/schema.prisma`);
  log(OK, "Migrations aplicadas. Gerando clients...");
  await cmdGenerate();
}

async function cmdMigrateDeploy() {
  title("Migration DEPLOY (produção)");
  run(OUCAB,  "npx prisma migrate deploy");
  run(AIUSCE, "npx prisma migrate deploy --schema=prisma/aiusce/schema.prisma");
  log(OK, "Migrations de deploy aplicadas.");
}

async function cmdReset() {
  log(WARN, "Isso vai APAGAR todos os dados de AMBOS os bancos e re-executar as seeds.");
  const confirm = await ask(`${WARN} Confirmar reset? (sim/não): `);
  if (confirm.toLowerCase() !== "sim") {
    log(INFO, "Cancelado."); return;
  }
  title("Reset — OUCAB + AIUSCE");
  run(OUCAB,  "npx prisma migrate reset --force");
  run(AIUSCE, "npx prisma migrate reset --force --schema=prisma/aiusce/schema.prisma");
  log(OK, "Reset concluído.");
}

async function cmdStatus() {
  title("Status das Migrations");
  run(OUCAB,  "npx prisma migrate status");
  run(AIUSCE, "npx prisma migrate status --schema=prisma/aiusce/schema.prisma");
}

function help() {
  console.log(`
${C.bold}${C.cyan}Gerenciador de banco — OUCAB + AIUSCE${C.reset}

  ${C.bold}Uso:${C.reset}
    node scripts/db.mjs <comando> [opções]

  ${C.bold}Comandos:${C.reset}
    ${C.green}generate${C.reset}              Gera os Prisma Clients (OUCAB e AIUSCE)
    ${C.green}migrate:dev${C.reset} [nome]    Cria e aplica migration em DEV (pede nome se omitido)
    ${C.green}migrate:deploy${C.reset}        Aplica migrations pendentes em produção
    ${C.green}reset${C.reset}                 Apaga dados e recria os bancos (pede confirmação)
    ${C.green}status${C.reset}                Exibe o status das migrations

  ${C.bold}Exemplos:${C.reset}
    node scripts/db.mjs generate
    node scripts/db.mjs migrate:dev add_campo_oculto
    node scripts/db.mjs migrate:deploy
`);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------
const [,, cmd, ...args] = process.argv;

switch (cmd) {
  case "generate":        await cmdGenerate(); break;
  case "migrate:dev":     await cmdMigrateDev(args[0]); break;
  case "migrate:deploy":  await cmdMigrateDeploy(); break;
  case "reset":           await cmdReset(); break;
  case "status":          await cmdStatus(); break;
  default:                help(); break;
}
