"use client";

import { BackButton } from "@/components/buttons/BackButton";
import SubmitButton from "@/components/buttons/SubmitButton";
import StatusMessage from "@/components/feedback/StatusMessage";
import NumberInput from "@/components/inputs/NumberInput";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";

export default function TwoFactorForm() {
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const {
    verifyTwoFactor,
    resetTwoFactor,
    isLoading,
    error,
    clearError,
    twoFactorToken,
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyTwoFactor(twoFactorCode, twoFactorToken || undefined);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setTwoFactorCode(value);

    if (error) {
      clearError();
    }
  };

  const handleBackToLogin = () => {
    setTwoFactorCode("");
    resetTwoFactor();
  };

  return (
    <div className="bg-white p-8 ">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <NumberInput
          value={twoFactorCode}
          onChange={handleInputChange}
          label="Código de Verificação"
          helpText="Digite o código de 6 dígitos do seu aplicativo autenticador"
        />

        {error && <StatusMessage message={error} type="error" />}

        <SubmitButton
          isLoading={isLoading}
          loadingText="Verificando..."
          defaultText="Verificar Código"
          icon={FiCheck}
          disabled={twoFactorCode.length !== 6}
        />
        <BackButton
          onClick={handleBackToLogin}
          fullWidth
          text="Voltar ao Login"
        />
      </form>
    </div>
  );
}
