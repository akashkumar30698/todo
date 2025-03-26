import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ReduxProvider } from "./lib/redux-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Advanced Todo App",
  description: "A React Todo application with API integration and Redux",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ReduxProvider>
            {children}
            <Toaster />
          </ReduxProvider>
      </body>
    </html>
  )
}

