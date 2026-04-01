import { Permissao } from '@prisma/client';
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            email: string
            nome: string
            tipo: "admin" | "externo"
            // Campos admin (usuário INTERNO/EXTERNO administrativo)
            login?: string
            permissao?: Permissao
            avatar?: string
            status?: boolean
            // Campos votante/candidato (usuário EXTERNO do portal)
            cpf?: string
            tipoCadastro?: string
            tipoInscricao?: string
            primeiroAcesso?: boolean
            cnpj?: string
        }
    }

    interface User extends DefaultUser {
        id: string
        email: string
        nome: string
        tipo: "admin" | "externo"
        login?: string
        permissao?: Permissao
        avatar?: string
        status?: boolean
        cpf?: string
        tipoCadastro?: string
        tipoInscricao?: string
        primeiroAcesso?: boolean
        cnpj?: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        email: string
        nome: string
        tipo: "admin" | "externo"
        login?: string
        permissao?: Permissao
        avatar?: string
        status?: boolean
        cpf?: string
        tipoCadastro?: string
        tipoInscricao?: string
        primeiroAcesso?: boolean
        cnpj?: string
    }
}
