"use client";

import Image from "next/image";

interface IProps {
  requiresTwoFactor: boolean;
}

export default function LoginHeader({ requiresTwoFactor }: IProps) {
  return (
    <div className="text-center space-y-4">
      <Image
        src={"/ic_logo_dark.png"}
        alt="Logo Icones"
        width={800}
        height={800}
        loading="eager"
        className="w-[185px] h-[70px] mx-auto"
      />
      <h2 className="text-xl font-bold" style={{ color: "var(--textDark)" }}>
        {requiresTwoFactor ? "Verificação 2FA" : "Entrar no Painel"}
      </h2>
      <p className="text-gray-600">
        {requiresTwoFactor
          ? "Digite o código de 6 dígitos do seu aplicativo autenticador"
          : "Acesse sua conta para continuar"}
      </p>
    </div>
  );
}
