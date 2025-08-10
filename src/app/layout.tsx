import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Estudo",
  description: "Sistema web para auxiliar estudantes a se prepararem para provas escolares",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="py-8">
              {children}
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
