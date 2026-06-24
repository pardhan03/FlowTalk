/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        "primary-dark": "#4F46E5",
        "primary-light": "#818CF8",

        background: "#F8FAFC",
        surface: "#FFFFFF",
        "surface-dark": "#F1F5F9",
        "surface-light": "#F8FAFC",

        foreground: "#0F172A",
        "foreground-muted": "#475569",
        "foreground-subtle": "#94A3B8",

        accent: "#FF6B6B",
        "accent-secondary": "#10B981",

        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",

        border: "#E2E8F0",
        "border-light": "#F1F5F9",
      },
    },
  },
  plugins: [],
}