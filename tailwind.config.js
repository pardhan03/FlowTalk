/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6C5CE7",
        "primary-dark": "#4B38D3",
        "primary-light": "#8F85F3",

        background: "#F6F7FB",
        surface: "#FFFFFF",
        "surface-dark": "#EBEFF5",
        "surface-light": "#F0F3F8",

        foreground: "#1C1929",
        "foreground-muted": "#5C5A6A",
        "foreground-subtle": "#8B899A",

        accent: "#FF6B6B",
        "accent-secondary": "#10B981",

        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",

        border: "#E2E7EE",
        "border-light": "#EFF2F6",
      },
    },
  },
  plugins: [],
}