import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Montserrat",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        title: ["AvilockBold", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // Colores base que usan variables CSS
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#0050F5", // Azul eléctrico
          foreground: "#FFFFFF", // Blanco para texto sobre azul
        },
        secondary: {
          DEFAULT: "#FFDC00", // Amarillo rayo
          foreground: "#000000", // Negro para texto sobre amarillo
        },
        accent: {
          DEFAULT: "#012F6B", // Azul oscuro
          foreground: "#FFFFFF", // Blanco para texto sobre azul oscuro
        },
        muted: {
          DEFAULT: "#B3B3B3", // Gris metálico
          foreground: "#000000", // Negro para texto sobre gris
        },
        destructive: {
          DEFAULT: "#EF4444", // Rojo para acciones destructivas
          foreground: "#FFFFFF",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "#0050F5", // Azul eléctrico
          "2": "#FFDC00", // Amarillo rayo
          "3": "#012F6B", // Azul oscuro
          "4": "#B3B3B3", // Gris metálico
          "5": "#25D366", // Verde WhatsApp
        },
        sidebar: {
          DEFAULT: "#0050F5", // Azul eléctrico
          foreground: "#FFFFFF",
          primary: "#FFDC00", // Amarillo rayo
          "primary-foreground": "#000000",
          accent: "#F3F4F6",
          "accent-foreground": "#000000",
          border: "#E5E7EB",
          ring: "#0050F5", // Azul eléctrico
        },
        whatsapp: {
          DEFAULT: "#25D366", // Verde WhatsApp
          foreground: "#FFFFFF", // Blanco para texto sobre verde
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
export default config
