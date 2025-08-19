import type React from "react"
import "./globals.css"
import "../styles/contrast-fixes.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL('https://cajademedidordeluz.com'),
  title: {
    default: "Medidores de Luz en Loja | Reparación y Venta | Reubí Elec",
    template: "%s | Reubí Elec - Expertos en Medidores"
  },
  description: "¿Problemas con tu medidor de luz en Loja? En Reubí Elec ofrecemos reparación, venta e instalación de medidores eléctricos. Especialistas en soluciones eléctricas residenciales e industriales. ¡Contáctanos ahora!",
  keywords: [
    "medidores de luz Loja",
    "reparar medidor de luz",
    "comprar medidor de luz",
    "instalación medidores eléctricos Loja",
    "problemas con medidor de luz",
    "servicio técnico eléctrico Loja",
    "medidores digitales Loja",
    "medidores prepago Loja",
    "electricista certificado Loja",
    "cambio de medidor eléctrico Loja"
  ],
  icons: {
    icon: "/images/Favicon.ico",
  },
  generator: 'Next.js',
  openGraph: {
    title: "Medidores de Luz en Loja | Reparación y Venta | Reubí Elec",
    description: "¿Problemas con tu medidor de luz en Loja? Expertos en reparación, venta e instalación de medidores eléctricos. ¡Solución inmediata y garantizada!",
    images: [
      {
        url: "/images/Imagen destacada.png",
        width: 1200,
        height: 630,
        alt: 'Reubí Elec - Especialistas en medidores de luz en Loja, Ecuador',
      },
    ],
    locale: 'es_EC',
    type: 'website',
    siteName: 'Reubí Elec - Medidores de Luz Loja',
    url: 'https://cajademedidordeluz.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Medidores de Luz en Loja | Reubí Elec",
    description: "¿Necesitas reparar o comprar un medidor de luz en Loja? Somos expertos en soluciones eléctricas. ¡Contáctanos ahora!",
    images: [
      {
        url: "/images/Imagen destacada.png",
        width: 1200,
        height: 630,
        alt: 'Reubí Elec - Especialistas en medidores de luz en Loja, Ecuador',
      },
    ],
    site: '@ReubiElecLoja',
    creator: '@ReubiElecLoja',
  },
  alternates: {
    canonical: 'https://cajademedidordeluz.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
