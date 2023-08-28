import './globals.css'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
// noSSR
const Session = dynamic(() => import('./Session'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agencia Escalavel',
  description: 'A plataforma #1 para escalar o lucro da sua agência',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Session>
          {children}
          <Toaster />
        </Session>
      </body>
    </html>
  )
}
