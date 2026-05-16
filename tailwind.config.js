/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      xs: "450px",
      sm: "575px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        /* ── Existing brand tokens (backward compat) ── */
        current: "currentColor",
        transparent: "transparent",
        white: "#FFFFFF",
        black: "#121723",
        dark: "#1D2430",
        primary: "#4A6CF7",
        yellow: "#FBB040",
        "bg-color-dark": "#171C28",
        "body-color": { DEFAULT: "#788293", dark: "#959CB1" },
        stroke: { stroke: "#E3E8EF", dark: "#353943" },
        gray: { ...colors.gray, dark: "#1E232E", light: "#F0F2F9" },
        "property-icon": "#0891B2",
        success: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",

        /* ── shadcn CSS variable bridge ── */
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(1 0 0 / <alpha-value>)",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "12px",
        pill: "9999px",
      },

      fontSize: {
        display: ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "heading-1": ["2.25rem", { lineHeight: "1.15", fontWeight: "700" }],
        "heading-2": ["1.5rem", { lineHeight: "1.25", fontWeight: "600" }],
        "heading-3": ["1.125rem", { lineHeight: "1.35", fontWeight: "600" }],
      },

      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
        "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
        submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
        "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
        btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
        "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
        "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
        card: "0px 4px 24px rgba(6, 8, 15, 0.08)",
        "card-hover": "0px 8px 32px rgba(6, 8, 15, 0.14)",
      },

      dropShadow: {
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.25s ease-out",
      },

      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        enter: {
          from: {
            opacity: "var(--tw-enter-opacity, 1)",
            transform:
              "translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0deg))",
          },
        },
        exit: {
          to: {
            opacity: "var(--tw-exit-opacity, 1)",
            transform:
              "translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0deg))",
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, addUtilities }) {
      // Data-state variants (replaces shadcn/tailwind.css @custom-variant blocks)
      addVariant("data-open", '&:is([data-state="open"], [data-open]:not([data-open="false"]))');
      addVariant("data-closed", '&:is([data-state="closed"], [data-closed]:not([data-closed="false"]))');
      addVariant("data-checked", '&:is([data-state="checked"], [data-checked]:not([data-checked="false"]))');
      addVariant("data-unchecked", '&:is([data-state="unchecked"], [data-unchecked]:not([data-unchecked="false"]))');
      addVariant("data-selected", '&[data-selected="true"]');
      addVariant("data-disabled", '&:is([data-disabled="true"], [data-disabled]:not([data-disabled="false"]))');
      addVariant("data-active", '&:is([data-state="active"], [data-active]:not([data-active="false"]))');
      addVariant("data-placeholder", "&[data-placeholder]");
      addVariant("data-starting-style", "&[data-starting-style]");
      addVariant("data-ending-style", "&[data-ending-style]");

      // Animation utilities (replaces tw-animate-css)
      addUtilities({
        ".animate-in": {
          animationName: "enter",
          animationDuration: "150ms",
          animationFillMode: "both",
          "--tw-enter-opacity": "1",
          "--tw-enter-scale": "1",
          "--tw-enter-rotate": "0deg",
          "--tw-enter-translate-x": "0",
          "--tw-enter-translate-y": "0",
        },
        ".animate-out": {
          animationName: "exit",
          animationDuration: "150ms",
          animationFillMode: "both",
          "--tw-exit-opacity": "1",
          "--tw-exit-scale": "1",
          "--tw-exit-rotate": "0deg",
          "--tw-exit-translate-x": "0",
          "--tw-exit-translate-y": "0",
        },
        ".animate-none": { animation: "none" },
        ".fade-in-0": { "--tw-enter-opacity": "0" },
        ".fade-out-0": { "--tw-exit-opacity": "0" },
        ".zoom-in-95": { "--tw-enter-scale": ".95" },
        ".zoom-out-95": { "--tw-exit-scale": ".95" },
        ".slide-in-from-top-2": { "--tw-enter-translate-y": "-0.5rem" },
        ".slide-in-from-bottom-2": { "--tw-enter-translate-y": "0.5rem" },
        ".slide-in-from-left-2": { "--tw-enter-translate-x": "-0.5rem" },
        ".slide-in-from-right-2": { "--tw-enter-translate-x": "0.5rem" },
      });
    }),
  ],
};
