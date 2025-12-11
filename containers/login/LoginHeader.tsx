interface IProps {
  requiresTwoFactor: boolean;
}

export default function LoginHeader({ requiresTwoFactor }: IProps) {
  return (
    <div className="text-center space-y-4">
      <h1
        className="text-4xl font-black tracking-tight"
        style={{ color: "var(--primaryDark)" }}
      >
        ÍC<span style={{ color: "#EF4444" }}>●</span>NES
      </h1>
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
