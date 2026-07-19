/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        background: "var(--bg)",
        foreground: "var(--text-main)",
        surface: "var(--surface)",
        'surface-hover': "var(--surface-hover)",
        primary: {
          DEFAULT: "#10B981",
          hover: "#059669",
          light: "rgba(16, 185, 129, 0.15)",
        },
        accent: {
          DEFAULT: "#6366F1",
          light: "rgba(99, 102, 241, 0.15)",
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        'glow': '0 0 25px rgba(16, 185, 129, 0.3)',
        'accent-glow': '0 0 25px rgba(99, 102, 241, 0.3)',
      }
    },
  },
  plugins: [],
}
