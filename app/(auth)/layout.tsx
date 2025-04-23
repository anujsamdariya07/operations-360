import { ClerkProvider } from "@clerk/nextjs"
import React from "react"
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Operations 360',
  description: 'Unified and modern layout for Operations360, designed to ensure trust, clarity, and seamless user experience.'
}

const inter = Inter({ subsets: ['latin'] })

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} bg-black min-h-screen`}>
      {children}
    </div>
  )
}
