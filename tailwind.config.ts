/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#008090",
        black60: "#00000099",
        black06: "#0000000F",
        black12: "#0000001F",
        grayCCC: "#CCCCCC",
        gray666: "#666666",
        grayF0: "#F0F0F0",
        error: "#D32F2F",
        blue: "#0041F0",
        warning: "#FFA500",
        success: "#008000",
        overlay: "#00000033",
        transparent: "#00000000",
        black: "#000000",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
