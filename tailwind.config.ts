import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsla(var(--background))",
        foreground: "hsla(var(--foreground))",
        card: {
          DEFAULT: "hsla(var(--card))",
          foreground: "hsla(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsla(var(--popover))",
          foreground: "hsla(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsla(var(--primary))",
          foreground: "hsla(var(--primary-foreground))",
          variant: "hsla(var(--primary-variant))",
        },
        secondary: {
          DEFAULT: "hsla(var(--secondary))",
          foreground: "hsla(var(--secondary-foreground))",
          variant: "hsla(var(--secondary-variant))",
        },
        muted: {
          DEFAULT: "hsla(var(--muted))",
          foreground: "hsla(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsla(var(--accent))",
          foreground: "hsla(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsla(var(--destructive))",
          foreground: "hsla(var(--destructive-foreground))",
        },
        border: "hsla(var(--border))",
        input: "hsla(var(--input))",
        ring: "hsla(var(--ring))",
        chart: {
          "1": "hsla(var(--chart-1))",
          "2": "hsla(var(--chart-2))",
          "3": "hsla(var(--chart-3))",
          "4": "hsla(var(--chart-4))",
          "5": "hsla(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        zoomIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        spinUp: {
          "0%": {
            transform: "translateY(100px) rotate(0deg)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0) rotate(360deg)",
            opacity: "1",
          },
        },
        spinCard: {
          "0%": {
            opacity: "1",
            transform: "rotateX(90deg) translateY(50px)",
          },
          "100%": {
            opacity: "1",
            transform: "rotateX(0deg) translateY(0)",
          },
        },
        slide: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
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
        beep: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        zoomIn: "zoomIn 0.8s ease-out forwards",
        spinUp: "spinUp 1s ease-out forwards",
        spinCard: "spinCard 0.8s ease-out forwards",
        slide: "slide 20s linear infinite",
        beep: "beep 1.5s ease-in-out infinite",
        "spin-slow": "spin 4s linear infinite",
        "spin-slow-reverse": "spin 4s linear infinite reverse",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
