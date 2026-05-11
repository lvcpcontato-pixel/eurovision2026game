import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eurovision 2026 — Palpites & Previsões',
  description: 'Faça seus palpites para o Eurovision 2026 e compete com seus amigos!',
  icons: { icon: '🌟' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen`} style={{ backgroundColor: '#0a0a1a', color: 'white' }}>
        {children}
      </body>
    </html>
  )
}
