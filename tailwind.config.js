/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // general
      light: "#FFFFFF",
      middle: "#666666",
      dark: "#151412",
      // Brown shades
      primary: "#c7a17a",
      secondary: "#30271c",
    },
  },
  plugins: [],
};
