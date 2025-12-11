"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmStep } from "./ConfirmStep";
import { QrCodeStep } from "./QrCodeStep";
import { SuccessStep } from "./SuccessStep";
import { useTwoFactorSetup } from "@/hooks/useTwoFactorSetup";
import { FiArrowLeft } from "react-icons/fi";

export default function TwoFactorSetupContainer() {
  const router = useRouter();
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const {
    step,
    setStep,
    setupData,
    isLoading,
    error,
    initSetup,
    confirmSetup,
    resetSetup,
    clearError,
  } = useTwoFactorSetup();

  const handleConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await confirmSetup(twoFactorCode);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setTwoFactorCode(value);
    if (error) clearError();
  };

  const handleBackToProfile = () => {
    router.push("/perfil");
  };

  const handleSuccess = () => {
    router.push("/perfil");
  };

  const getStepTitle = () => {
    switch (step) {
      case "qr-code":
        return "Configurar Autenticação de Dois Fatores";
      case "confirm":
        return "Confirmar Configuração";
      case "success":
        return "2FA Ativado!";
      default:
        return "Configurar Autenticação de Dois Fatores";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "qr-code":
        return "Configure a autenticação de dois fatores para proteger sua conta";
      case "confirm":
        return "Digite o código de 6 dígitos do seu aplicativo autenticador";
      case "success":
        return "Sua conta agora está protegida com autenticação de dois fatores";
      default:
        return "Configure a autenticação de dois fatores para proteger sua conta";
    }
  };

  return (
    <div
      className={`-mx-6 border-0 md:border md:border-[#e9ecef] p-8 pt-2 md:shadow sm:mx-auto sm:p-6 md:mx-0 md:rounded-lg`}
    >
      <div className="mb-8">
        <button
          type="button"
          onClick={handleBackToProfile}
          className={`mb-4 flex cursor-pointer items-center text-sm text-[#67748E] transition-colors hover:text-[#344767]`}
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Perfil
        </button>

        <div
          className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between`}
        >
          <div>
            <h1 className="text-title text-2xl font-bold">{getStepTitle()}</h1>
            <span className="text-muted block text-base">
              {getStepDescription()}
            </span>
          </div>
        </div>
      </div>
      {step === "qr-code" && (
        <QrCodeStep
          isLoading={isLoading}
          setupData={setupData}
          error={error}
          onInitSetup={initSetup}
          onResetSetup={resetSetup}
          onBackToProfile={handleBackToProfile}
          onNextStep={() => setStep("confirm")}
        />
      )}

      {step === "confirm" && (
        <ConfirmStep
          twoFactorCode={twoFactorCode}
          isLoading={isLoading}
          error={error}
          onSubmit={handleConfirmSubmit}
          onCodeChange={handleCodeChange}
          onBack={() => setStep("qr-code")}
        />
      )}

      {step === "success" && <SuccessStep onContinue={handleSuccess} />}
    </div>
  );
}
