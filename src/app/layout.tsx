"use client"

import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonTypesProvider } from "@/components/providers/PokemonTypesContext";
import { Toaster } from "sonner";
import Header from "@/components/customs/Header/Header";
import { ThemeProvider } from "@/components/providers/ThemeContext";
import Loading from "@/components/ui/Loading/Loading";
import useIsLoading from "@/hooks/useIsLoading";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoading = useIsLoading();

  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <PokemonTypesProvider>
                <Toaster richColors closeButton duration={3000} theme='dark' visibleToasts={1} />
                  {isLoading  
                    ? <div className="fullScreenCenter">
                        <Loading/>
                      </div>
                    : <>
                        <Header />
                        {children}
                      </>
                  }
              </PokemonTypesProvider>
            </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
