import { Inter } from "next/font/google";

import { AuthProvider } from "@/providers/AuthProvider";
import { FirebaseProvider } from "@/providers/FirebaseProvider";
import "./globals.css";
import { AppQueryClientProvider } from "@/providers/QueryClientProvider";
import TranslationProvider from "@/providers/TranslationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nami",
  description:
    "Melhore sua produtividade e qualidade das consultas. Economize até 2hrs por dia automatizando o preenchimento do prontuário médico.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full font-inter">
      <body className={`${inter.className} h-full`}>
        <div className="font-inter">
          <FirebaseProvider>
            <AppQueryClientProvider>
              <TranslationProvider>
                <AuthProvider>{children}</AuthProvider>
              </TranslationProvider>
            </AppQueryClientProvider>
          </FirebaseProvider>
        </div>
      </body>
    </html>
  );
}
