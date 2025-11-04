import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        web: "601px",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      fontSize: {
        "h1-R": [
          "20px",
          {
            lineHeight: "160%",
            fontWeight: "700",
            letterSpacing: "-0.3%",
          },
        ],
        "h1-M": [
          "24px",
          {
            lineHeight: "160%",
            fontWeight: "700",
            letterSpacing: "-0.3%",
          },
        ],
        "heading-1": [
          "32px",
          {
            lineHeight: "48px",
            fontWeight: "800",
          },
        ],
        "heading-2": [
          "24px",
          {
            lineHeight: "36px",
            fontWeight: "800",
          },
        ],
        "heading-3": [
          "20px",
          {
            lineHeight: "30px",
            fontWeight: "800",
          },
        ],
        "heading-3-thin": [
          "20px",
          {
            lineHeight: "30px",
            fontWeight: "400",
          },
        ],
        "heading-4": [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "700",
          },
        ],
        "heading-5": [
          "14px",
          {
            lineHeight: "25.2px",
            fontWeight: "700",
          },
        ],
        "heading-6": [
          "12px",
          {
            lineHeight: "21.6px",
            fontWeight: "700",
          },
        ],
        "title-1": [
          "18px",
          {
            lineHeight: "150%",
            fontWeight: "700",
            letterSpacing: "-0.3%",
          },
        ],
        "title-2": [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "700",
            letterSpacing: "-0.3%",
          },
        ],
        "title-3": [
          "14px",
          {
            lineHeight: "150%",
            fontWeight: "700",
            letterSpacing: "-0.3%",
          },
        ],
        "title-4": [
          "12px",
          {
            lineHeight: "140%",
            fontWeight: "700",
            letterSpacing: "-0.3%",
          },
        ],
        "subtitle-1": [
          "18px",
          {
            lineHeight: "150%",
            fontWeight: "700",
          },
        ],
        "subtitle-2": [
          "16px",
          {
            lineHeight: "150%",
            fontWeight: "700",
          },
        ],
        "body-1": [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],
        "body-2": [
          "14px",
          {
            lineHeight: "21px",
            fontWeight: "400",
          },
        ],
        "body-3": [
          "14px",
          {
            lineHeight: "150%",
            fontWeight: "400",
          },
        ],
        "body-2-bold": [
          "14px",
          {
            lineHeight: "21px",
            fontWeight: "700",
          },
        ],
        caption: [
          "12px",
          {
            lineHeight: "21.6px",
            fontWeight: "400",
          },
        ],
        "caption-bold": [
          "12px",
          {
            lineHeight: "21.6px",
            fontWeight: "700",
          },
        ],
        "button-s-cta": [
          "12px",
          {
            lineHeight: "18px",
            fontWeight: "800",
          },
        ],
        "button-s": [
          "12px",
          {
            lineHeight: "21.6px",
            fontWeight: "700",
          },
        ],
        "button-m-cta": [
          "14px",
          {
            lineHeight: "21px",
            fontWeight: "800",
          },
        ],
        "button-m": [
          "14px",
          {
            lineHeight: "22.4px",
            fontWeight: "700",
          },
        ],
      },
      colors: {
        primary: "hsl(var(--primary))",
        "primary-strong": "hsl(var(--primary-strong))",
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
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        black: "hsl(var(--black))",
        error: "hsl(var(--error))",
        label: "hsl(var(--label))",
        "label-natural": "hsl(var(--label-natural))",
        "label-strong": "hsl(var(--label-strong))",
        "label-alternative": "hsl(var(--label-alternative))",
        "status-clear": "hsl(var(--status-clear))",
        "status-error": "hsl(var(--status-error))",
        "status-success": "hsl(var(--status-success))",
        line: "hsl(var(--line))",
      },
      borderRadius: {
        lg: "var(--radius)", // 10px
        md: "calc(var(--radius) - 2px)", // 8px
        sm: "calc(var(--radius) - 4px)", // 6px
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
  plugins: [
    tailwindcssAnimate,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".hide-scroll-bar": {
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari, and Opera
          },
        },
        ".toast-shadow": {
          boxShadow: "0px 12px 20px 0px #C4C4C440",
        },
      });
    }),
  ],
};
export default config;
