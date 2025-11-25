"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Info, DollarSign, CheckCircle } from "lucide-react";

export default function RepassePage() {
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Mock submission logic
    setTimeout(() => {
      setSubmitted(false);
      setAmount("");
      alert("Solicitação enviada com sucesso!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="space-y-2">
          <Link
            href="/event/1"
            className="inline-flex items-center text-gray-600 mb-4 gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-sm font-medium">Voltar</span>
          </Link>
          <h1 className="text-lg font-bold text-gray-900">
            Solicitação de Repasse
          </h1>
          <p className="text-sm text-gray-500">Gerencie seus recebimentos</p>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h2 className="text-blue-900 font-medium mb-2">
                Informações Importantes
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                <li>
                  O repasse é calculado sobre o faturamento das taxas de vendas
                </li>
                <li>Solicitações são analisadas em até 2 dias úteis</li>
                <li>O valor será transferido após aprovação</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-gray-700 font-medium mb-4">Nova Solicitação</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor do Repasse
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">R$</span>
                </div>
                <input
                  type="number"
                  placeholder="0,00"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Saldo disponível: R$ 12.450,00
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  submitted ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={submitted}
              >
                {submitted ? "Enviando..." : "Solicitar Repasse"}
              </button>
            </div>
          </form>
        </div>

        {/* Recent Requests Mock */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-gray-700 font-medium mb-4">Histórico Recente</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                    20/11/2024
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                    R$ 5.000,00
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" /> Pago
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                    15/11/2024
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                    R$ 2.500,00
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" /> Pago
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                    10/11/2024
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                    R$ 1.000,00
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" /> Pago
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
