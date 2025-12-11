import { Button } from "@/components/buttons/Button";
import { TwoFactorSetupInitResponse } from "@/types/authTwoFactor";
import { FiAlertCircle, FiArrowRight, FiShield } from "react-icons/fi";
import QRCodeDisplay from "./QrCodeDisplay";

interface QrCodeStepProps {
  isLoading: boolean;
  setupData: TwoFactorSetupInitResponse | null;
  error: string | null;
  onInitSetup: () => void;
  onResetSetup: () => void;
  onBackToProfile: () => void;
  onNextStep: () => void;
}

export function QrCodeStep({
  isLoading,
  setupData,
  error,
  onInitSetup,
  onResetSetup,
  onBackToProfile,
  onNextStep,
}: QrCodeStepProps) {
  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center">
            <div className="mr-3 h-6 w-6 animate-spin rounded-full border-2 border-gray-900 border-t-transparent"></div>
            <span className="text-gray-600">Carregando configuração...</span>
          </div>
        </div>
      ) : setupData ? (
        <>
          <QRCodeDisplay
            qrCode={setupData.qrCode}
            secret={setupData.secret}
            onCopySecret={() => {}}
          />

          {/* Next Step Button */}
          <Button
            variant="primary"
            onClick={onNextStep}
            className="flex w-full items-center justify-center px-4 py-3"
          >
            <FiArrowRight className="mr-2 h-4 w-4" />
            Próximo Passo
          </Button>
        </>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center">
            <FiAlertCircle className="mr-2 h-5 w-5 text-red-400" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
          {error.includes("já está configurada") ? (
            <div className="mt-3 flex space-x-3">
              <Button variant="outline" onClick={onBackToProfile}>
                Voltar para Perfil
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={onResetSetup} className="mt-3">
              Tentar Novamente
            </Button>
          )}
        </div>
      ) : (
        <div className="py-8 text-center">
          <div className="mb-4">
            <FiShield className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            Iniciar Configuração 2FA
          </h3>
          <p className="mb-6 text-sm text-gray-600">
            Clique no botão abaixo para começar a configurar a autenticação de
            dois fatores para sua conta.
          </p>
          <Button
            variant="primary"
            onClick={onInitSetup}
            className="mx-auto flex items-center justify-center px-4 py-3"
          >
            <FiShield className="mr-2 h-4 w-4" />
            Iniciar Configuração
          </Button>
        </div>
      )}
    </div>
  );
}
