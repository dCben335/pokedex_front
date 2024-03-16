"use client"

import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonTypesProvider } from "@/components/providers/PokemonTypesContext";
import { Toaster } from "sonner";
import "./globals.scss";


const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <PokemonTypesProvider>
            <Toaster richColors closeButton duration={3000} theme='dark' visibleToasts={1}/>
            {children}
          </PokemonTypesProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
