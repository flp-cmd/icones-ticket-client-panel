import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../style/globals.css";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import AppOverlay from "@/components/overlay/AppOverlay";
import { AppProvider } from "@/contexts/AppContext";
import { QueryProvider } from "@/contexts/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Icones Painel Produtor",
  description: "Painel de controle para produtores de eventos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            <AppProvider>
              <Layout>{children}</Layout>
              <AppOverlay />
            </AppProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
