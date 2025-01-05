import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProfileProvider } from '@/contexts/ProfileContext'
import { ConnectionProvider } from '@/contexts/ConnectionContext'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Modern dashboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <div className="min-h-screen bg-background relative overflow-hidden">
          {/* Gradient background effects */}
          <div className="fixed inset-0 z-0">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>
          
          <div className="relative z-10">
            <AuthProvider>
              <ProfileProvider>
                <ConnectionProvider>
                  <Toaster position="top-right" />
                  {children}
                </ConnectionProvider>
              </ProfileProvider>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}