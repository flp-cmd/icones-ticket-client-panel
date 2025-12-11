"use client";

import { useRouter } from "next/navigation";
import { MOCK_USER } from "../data/mocks";
import { useAuth } from "@/contexts/auth/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { requiresTwoFactor } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 space-y-6">
        <h1 className="text-lg font-bold text-gray-900">Perfil</h1>

        {/* Personal Info Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Informações Pessoais
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="mt-0.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Nome</p>
                <p className="text-sm text-gray-800">{MOCK_USER.name}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-0.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm text-gray-800">{MOCK_USER.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-0.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">CPF</p>
                <p className="text-sm text-gray-800">{MOCK_USER.cpfCnpj}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-0.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">2FA</p>
                <p className="text-sm text-gray-800">
                  {requiresTwoFactor ? "Ativado" : "Desativado"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            className="w-full bg-white border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 shadow-sm active:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:bg-white"
            onClick={() => router.push("/perfil/2fa-setup")}
            disabled={requiresTwoFactor}
          >
            Autenticação em duas etapas
          </button>
          <button className="w-full bg-white border border-red-100 rounded-xl py-3 text-sm font-medium text-red-600 shadow-sm active:bg-red-50 flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
