const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 20%": { transform: "translate(0, 0)" }, // Espera inicial
          "25%": { transform: "translate(20px, -15px)" }, // Primer movimiento
          "25.1%, 40%": { transform: "translate(20px, -15px)" }, // Pausa 1
          "45%": { transform: "translate(-30px, 10px)" }, // Segundo movimiento
          "45.1%, 70%": { transform: "translate(-30px, 10px)" }, // Pausa 2
          "75%": { transform: "translate(15px, -20px)" }, // Tercer movimiento
          "75.1%, 80%": { transform: "translate(15px, -20px)" }, // Pausa 3
          "85%": { transform: "translate(-10px, 5px)" }, // Cuarto movimiento
          "85.1%, 90%": { transform: "translate(-10px, 5px)" }, // Pausa 4
          "95%": { transform: "translate(0, 0)" }, // Vuelve al centro
          "95.1%, 100%": { transform: "translate(0, 0)" }, // Espera final
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 15s linear infinite",
        "fade-in": "fade-in 0.8s ease-out 1s forwards",
        "fade-up-1": "fade-up 0.5s ease-out 0.2s forwards",
        "fade-up-2": "fade-up 0.5s ease-out 0.4s forwards",
        "fade-up-3": "fade-up 0.5s ease-out 0.6s forwards",
        "fade-up-4": "fade-up 0.5s ease-out 0.8s forwards",
        "fade-up-5": "fade-up 0.8s ease-out 1s forwards",
        "fade-up-6": "fade-up 0.8s ease-out 1.1s forwards",
        float: "float 12s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
