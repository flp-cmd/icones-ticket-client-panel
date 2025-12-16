interface IProps {
  requiresTwoFactor: boolean;
}

export default function LoginFooter({ requiresTwoFactor }: IProps) {
  return (
    <div className="mt-6 text-center">
      <p className="text-xs text-gray-500">
        {requiresTwoFactor &&
          "Use seu aplicativo autenticador para gerar o código"}
      </p>
    </div>
  );
}
