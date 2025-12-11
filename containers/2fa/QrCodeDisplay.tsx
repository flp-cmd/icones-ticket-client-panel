"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import Image from "next/image";
import { logger } from "@/services/loggerService";

interface QRCodeDisplayProps {
  qrCode: string;
  secret: string;
  onCopySecret: () => void;
}

export default function QRCodeDisplay({
  qrCode,
  secret,
  onCopySecret,
}: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
      onCopySecret();
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      logger.error("Failed to copy secret:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* QR Code */}
      <div className="text-center">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Escaneie o QR Code
        </h3>
        <div className="mx-auto inline-block rounded-lg border border-gray-200 bg-white p-4">
          <Image
            src={qrCode}
            alt="QR Code para configuração 2FA"
            width={192}
            height={192}
            className="h-48 w-48"
          />
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Use um aplicativo autenticador como Google Authenticator, Authy ou
          Microsoft Authenticator
        </p>
      </div>

      {/* Secret Key */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Chave Secreta</h4>
            <p className="mt-1 text-xs text-gray-600">
              Use esta chave se não conseguir escanear o QR code
            </p>
          </div>
          <button
            onClick={handleCopySecret}
            className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none"
          >
            {copied ? (
              <>
                <FiCheck className="mr-2 h-4 w-4 text-green-600" />
                Copiado
              </>
            ) : (
              <>
                <FiCopy className="mr-2 h-4 w-4" />
                Copiar
              </>
            )}
          </button>
        </div>
        <div className="mt-3 rounded-md bg-white p-3">
          <code className="font-mono text-sm text-gray-900 break-all">
            {secret}
          </code>
        </div>
      </div>
    </div>
  );
}
