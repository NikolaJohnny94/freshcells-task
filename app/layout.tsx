import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
//Components
import { Navbar } from '@/components/layout/Navbar'
import { Toaster } from '@/components/ui/sonner'

//Providers
import { I18nProvider } from '@/providers/I18nProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import ApolloProvider from '@/providers/ApolloProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'freshcells Task - Authentication App',
  description:
    'A authentication application built with Next.js, GraphQL, and TypeScript',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <ApolloProvider>
              <AuthProvider>
                <Navbar />
                {children}
              </AuthProvider>
            </ApolloProvider>
            <Toaster />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
