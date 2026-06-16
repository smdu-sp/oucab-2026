import Image from "next/image";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function HeaderAiusce() {
    return (
        <header className="relative top-0 left-0 w-full z-50">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/aiusce/banner.png')`
                }}
            />
            <div className="relative z-10 flex justify-between items-center p-8 gap-4">
                <Link href="https://www.prefeitura.sp.gov.br/" target="_blank">
                    <Image
                        src="/aiusce/prefeitura/logo-dark.png"
                        alt="Prefeitura de São Paulo"
                        className="hidden md:block md:w-64 h-auto"
                        width={900}
                        height={290}
                    />
                    <Image
                        src="/aiusce/prefeitura/brasao.png"
                        alt="Prefeitura de São Paulo"
                        className="md:hidden w-36 h-auto"
                        width={900}
                        height={290}
                    />
                </Link>
                <div className="flex flex-col items-end gap-3">
                    <span className="text-white text-lg md:text-2xl font-bold text-right md:max-w-[50%]">
                        Área de Intervenção Urbana do Setor Central
                    </span>
                    <Link
                        href="/aiusce/login"
                        className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-md px-5 py-2 text-sm font-semibold shadow-lg hover:bg-gray-100 transition-colors"
                    >
                        <LogIn className="w-4 h-4" />
                        Área Restrita
                    </Link>
                </div>
            </div>
        </header>
    )
}
