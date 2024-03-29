"use client"

import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonTypesProvider } from "@/components/providers/PokemonTypesContext";
import { Toaster } from "sonner";
import "./globals.scss";
import Header from "@/components/customs/Header/Header";
import { ThemeProvider } from "@/components/providers/ThemeContext";
import { UserProvider } from "@/components/providers/UserContext";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <ThemeProvider>
              <PokemonTypesProvider>
                <Toaster richColors closeButton duration={3000} theme='dark' visibleToasts={1} />
                <Header />
                {children}
              </PokemonTypesProvider>
            </ThemeProvider>
          </UserProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
