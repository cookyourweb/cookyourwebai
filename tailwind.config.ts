import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        sidebar: "hsl(var(--sidebar-background))",
        "sidebar-foreground": "hsl(var(--sidebar-foreground))",
        "sidebar-primary": "hsl(var(--sidebar-primary))",
        "sidebar-primary-foreground": "hsl(var(--sidebar-primary-foreground))",
        "sidebar-accent": "hsl(var(--sidebar-accent))",
        "sidebar-accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        "sidebar-border": "hsl(var(--sidebar-border))",
        "sidebar-ring": "hsl(var(--sidebar-ring))",

        // Los 4 neones de marca: ya no hexadecimales sueltos, apuntan
        // al paso 200 de su rampa (ver src/index.css).
        neonblue: "var(--color-neonblue)",
        neonpink: "var(--color-neonpink)",
        neonviolet: "var(--color-neonviolet)",
        neongreen: "var(--color-neongreen)",

        // Rampas de marca completas (pasos 50-900), para usar como
        // bg-cian-500, text-magenta-200, border-verde-700, etc.
        // Los valores viven en src/index.css (tokens-color.json es la
        // fuente); acá solo se referencian.
        cian: {
          50: "var(--color-cian-50)",
          100: "var(--color-cian-100)",
          200: "var(--color-cian-200)",
          300: "var(--color-cian-300)",
          400: "var(--color-cian-400)",
          500: "var(--color-cian-500)",
          600: "var(--color-cian-600)",
          700: "var(--color-cian-700)",
          800: "var(--color-cian-800)",
          900: "var(--color-cian-900)",
        },
        magenta: {
          50: "var(--color-magenta-50)",
          100: "var(--color-magenta-100)",
          200: "var(--color-magenta-200)",
          300: "var(--color-magenta-300)",
          400: "var(--color-magenta-400)",
          500: "var(--color-magenta-500)",
          600: "var(--color-magenta-600)",
          700: "var(--color-magenta-700)",
          800: "var(--color-magenta-800)",
          900: "var(--color-magenta-900)",
        },
        violeta: {
          50: "var(--color-violeta-50)",
          100: "var(--color-violeta-100)",
          200: "var(--color-violeta-200)",
          300: "var(--color-violeta-300)",
          400: "var(--color-violeta-400)",
          500: "var(--color-violeta-500)",
          600: "var(--color-violeta-600)",
          700: "var(--color-violeta-700)",
          800: "var(--color-violeta-800)",
          900: "var(--color-violeta-900)",
        },
        verde: {
          50: "var(--color-verde-50)",
          100: "var(--color-verde-100)",
          200: "var(--color-verde-200)",
          300: "var(--color-verde-300)",
          400: "var(--color-verde-400)",
          500: "var(--color-verde-500)",
          600: "var(--color-verde-600)",
          700: "var(--color-verde-700)",
          800: "var(--color-verde-800)",
          900: "var(--color-verde-900)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "pulse-neon": "pulse-neon 1.5s infinite alternate",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        /* Nombre propio a proposito: llamarla "pulse" pisaba el keyframe
           de fabrica de Tailwind y rompia animate-pulse en toda la app. */
        "pulse-neon": {
          "0%": {
            opacity: "1",
            filter: "drop-shadow(0 0 6px rgb(var(--color-neonpink-rgb) / 0.7))",
          },
          "100%": {
            opacity: "0.7",
            filter: "drop-shadow(0 0 20px rgb(var(--color-neonpink-rgb) / 1))",
          },
        },
      },
    },
  },
  plugins: [animate],
};

export default config;
