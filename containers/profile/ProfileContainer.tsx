"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Mail, User, Lock, LogOut } from "lucide-react";

export default function ProfileContainer() {
  const router = useRouter();
  const { requiresTwoFactor, user, logout } = useAuth();

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
              <div className="mt-1 text-gray-400">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Nome</p>
                <p className="text-sm text-gray-800">{user?.name}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 text-gray-400">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm text-gray-800">{user?.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1 text-gray-400">
                <Lock size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400">2FA</p>
                <p
                  className={`text-sm font-medium ${
                    requiresTwoFactor ? "text-green-600" : "text-red-600"
                  }`}
                >
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
          <button
            onClick={logout}
            className="w-full bg-white border border-red-100 rounded-xl py-3 text-sm font-medium text-red-600 shadow-sm active:bg-red-50 flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
