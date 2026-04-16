import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function verificaPagina(pagina: number, limite: number) {
  if (!pagina) pagina = 1;
  if (!limite) limite = 10;
  if (pagina < 1) pagina = 1;
  if (limite < 1) limite = 10;
  return [pagina, limite];
}

export function verificaLimite(pagina: number, limite: number, total: number) {
  if ((pagina - 1) * limite >= total) pagina = Math.ceil(total / limite);
  return [pagina, limite];
}

/**
 * Formata um campo DATE do banco (DateTime @db.Date) sem conversão de fuso.
 * Prisma retorna esses campos como meia-noite UTC; usar getDate() local jogaria
 * para o dia anterior em UTC-3. Usar getUTC* garante o dia correto.
 */
export function formatDateBR(date: Date): string {
  const dia = String(date.getUTCDate()).padStart(2, "0");
  const mes = String(date.getUTCMonth() + 1).padStart(2, "0");
  const ano = date.getUTCFullYear();
  return `${dia}/${mes}/${ano}`;
}

export function verificaData(dataInicio: string, dataFim: string): [Date, Date] {
  let inicio: Date, fim: Date;
  if (!dataInicio) inicio = new Date();
  else {
    const dataSeparada = dataInicio.split('-');
    inicio = new Date(
      +dataSeparada[2],
      +dataSeparada[1] - 1,
      +dataSeparada[0],
      0, 0, 0
    )
  }
  if (!dataFim) fim = new Date();
  else {
    const dataSeparada = dataFim.split('-');
    fim = new Date(
      +dataSeparada[2],
      +dataSeparada[1] - 1,
      +dataSeparada[0],
      23, 59, 59, 999
    )
  }
  return [inicio, fim];
}