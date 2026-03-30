import bcryptjs from "bcryptjs";

const CHARSET = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
const SALT_ROUNDS = 10;

export function gerarSenha(tamanho = 10): string {
  return Array.from({ length: tamanho }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)]
  ).join("");
}

export async function hashSenha(senha: string): Promise<string> {
  return bcryptjs.hash(senha, SALT_ROUNDS);
}

export async function verificarSenha(senha: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(senha, hash);
}
