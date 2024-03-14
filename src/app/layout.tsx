"use client"

import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonTypeProvider } from "@/components/providers/PokemonTypeContext";
import "./globals.scss";
import { Toaster } from "sonner";


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
          <PokemonTypeProvider>
            <Toaster richColors closeButton duration={3000} theme='dark' visibleToasts={1}/>
            {children}
          </PokemonTypeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
