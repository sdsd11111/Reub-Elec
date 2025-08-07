import type React from "react"
import "./globals.css"
import "../styles/contrast-fixes.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL('https://cajademedidordeluz.com'),
  title: "Reubi Elec: Servicios de Medidores de Luz",
  description: "Bienvenido a Reubi Elec, disfruta nuestros servicios.",
  icons: {
    icon: "/images/Favicon.ico",
  },
  generator: 'Next.js',
  openGraph: {
    title: "Reubi Elec: Servicios de Medidores de Luz",
    description: "Bienvenido a Reubi Elec, disfruta nuestros servicios.",
    images: [
      {
        url: "/images/Imagen destacada.png",
        width: 1200,
        height: 630,
        alt: 'Reubi Elec - Especialistas en instalaciones eléctricas',
      },
    ],
    locale: 'es_EC',
    type: 'website',
    siteName: 'Reubi Elec',
    url: 'https://cajademedidordeluz.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Reubi Elec: Servicios de Medidores de Luz",
    description: "Bienvenido a Reubi Elec, disfruta nuestros servicios.",
    images: [
      {
        url: "/images/Imagen destacada.png",
        width: 1200,
        height: 630,
        alt: 'Reubi Elec - Especialistas en instalaciones eléctricas',
      },
    ],
  },
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
