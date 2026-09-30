import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { TourProvider } from '@/context/TourContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Apex Enterprise Admin Portal & Management Dashboard',
  description: 'Production-Grade Admin Dashboard & Management Portal built with Next.js, React, TypeScript, and REST API.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} bg-slate-50/50 text-slate-800 antialiased min-h-screen selection:bg-purple-500 selection:text-white`}>
        <AuthProvider>
          <ToastProvider>
            <TourProvider>
              <div className="flex min-h-screen bg-slate-50/50">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                  <Header />
                  <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
                    {children}
                  </main>
                </div>
              </div>
            </TourProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
