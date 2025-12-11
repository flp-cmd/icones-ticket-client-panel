import { Button } from "@/components/buttons/Button";
import { FiArrowRight, FiCheck } from "react-icons/fi";

interface SuccessStepProps {
  onContinue: () => void;
}

export function SuccessStep({ onContinue }: SuccessStepProps) {
  return (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <FiCheck className="h-8 w-8 text-green-600" />
      </div>

      {/* Success Message */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">
          Configuração Concluída!
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Sua conta agora está protegida com autenticação de dois fatores. Você
          será solicitado a fornecer um código toda vez que fizer login.
        </p>
      </div>

      {/* Continue Button */}
      <Button
        variant="primary"
        onClick={onContinue}
        className="flex w-full items-center justify-center px-4 py-3"
      >
        <FiArrowRight className="mr-2 h-4 w-4" />
        Ir para Perfil
      </Button>
    </div>
  );
}
