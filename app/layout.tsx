import type React from "react"
import "./globals.css"
import "../styles/contrast-fixes.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reubi Elec",
  description: "Especialistas en instalaciones eléctricas seguras y confiables",
  icons: {
    icon: "/images/Favicon.ico",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
