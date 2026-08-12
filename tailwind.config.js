/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#EEF0F2",
        black: "#13100F",
        // Palette Principali
        red: {
          100: "#ffbaba", 200: "#ff9595", 300: "#ff6f6f", 400: "#ff4a4a",
          500: "#ff3131", 600: "#d92a2a", 700: "#b32323", 800: "#8c1b1b", 900: "#661414", 950: "#400d0d",
        },
        blue: {
          100: "#b3f3f3", 200: "#80eeee", 300: "#4de8e8", 400: "#1ae3e3",
          500: "#00cece", 600: "#00afaf", 700: "#009090", 800: "#007272", 900: "#005454", 950: "#003636",
        },
        // Scale Neutre con sottotono giallo/ocra
        stone: {
          100: "#f5f4ef", 200: "#e9e7df", 300: "#dcd9cf", 400: "#c7c2b6",
          500: "#ada799", 600: "#918b7d", 700: "#756f63", 800: "#5e584d", 900: "#47423a", 950: "#2e2b26",
        },
        // Scale "Gray" custom richieste
        "ocragray": {
          100: "#e6e2de", 200: "#ccc6bf", 300: "#b3a99f", 400: "#998b7f",
          500: "#806e5e", 600: "#504438", 700: "#40362d", 800: "#302922", 900: "#201c17", 950: "#100e0b",
        },
        "bluegray": {
          100: "#d1d2d6", 200: "#a3a5ad", 300: "#757884", 400: "#484c5b",
          500: "#383a43", 600: "#2d2f37", 700: "#23242a", 800: "#1b1c21", 900: "#131417", 950: "#0a0a0c",
        },
        "redgray": {
          100: "#f0eceb", 200: "#dcd2d0", 300: "#c7b8b4", 400: "#ae9590",
          500: "#94726c", 600: "#7a5c57", 700: "#604743", 800: "#463532", 900: "#2d2220", 950: "#171211",
        },
        green: "#00d27a",
        primary: "#ff3131",
        secondary: "#00cece",
      },
      fontFamily: {
        haas: ["var(--font-haas)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        rezland: ["var(--font-rezland)", "sans-serif"],
        candyhaus: ["var(--font-candyhaus)", "sans-serif"],
        galaxytail: ["var(--font-galaxytail)", "sans-serif"],
        yummy: ["var(--font-yummy)", "sans-serif"],
        crenzo: ["var(--font-crenzo)", "sans-serif"],
        revert: ["var(--font-revert)", "sans-serif"],
        revertro: ["var(--font-revertro)", "sans-serif"],
        neuropol: ["var(--font-neuropol)", "sans-serif"],
      },
      keyframes: {
        "bounce-x": {
          "0%, 100%": { transform: "translateX(-3px)", animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)" },
          "50%": { transform: "translateX(12px)", animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
        },
      },
      animation: {
        "bounce-x": "bounce-x 1s infinite",
      },
    },
  },
  plugins: [],
};