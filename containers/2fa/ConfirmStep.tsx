import { FiArrowLeft, FiCheck } from "react-icons/fi";
import SubmitButton from "@/components/buttons/SubmitButton";
import NumberInput from "@/components/inputs/NumberInput";
import StatusMessage from "@/components/feedback/StatusMessage";
import { Button } from "@/components/buttons/Button";

interface ConfirmStepProps {
  twoFactorCode: string;
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
}

export function ConfirmStep({
  twoFactorCode,
  isLoading,
  error,
  onSubmit,
  onCodeChange,
  onBack,
}: ConfirmStepProps) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {/* 2FA Code Field */}
      <NumberInput
        value={twoFactorCode}
        onChange={onCodeChange}
        label="Código de Verificação"
        helpText="Digite o código de 6 dígitos do seu aplicativo autenticador"
      />

      {/* Error Message */}
      {error && <StatusMessage message={error} type="error" />}

      {/* Submit Button */}
      <SubmitButton
        isLoading={isLoading}
        loadingText="Confirmando..."
        defaultText="Confirmar Configuração"
        icon={FiCheck}
        disabled={twoFactorCode.length !== 6}
      />

      {/* Back Button */}
      <Button
        variant="outline"
        onClick={onBack}
        className="flex w-full items-center justify-center"
      >
        <FiArrowLeft className="mr-2 h-4 w-4" />
        Voltar passo
      </Button>
    </form>
  );
}
