/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      customTheme: {
        primary: "#663b2e",
        secondary: "#f1f1f1",
        accent: "#93756c",
        neutral: "#e7e7e7",
        info: "#3ABFF8",
        success: "#4caf50",
        warning: "#fbbd23",
        error: "#bd3a23",
        "base-100": "#ffffff",
      },
    },],
  },
}
