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
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(20rem,1fr))",
      },
      colors: {
        // general
        light: "#fff",
        middle: "#666666",
        dark: "#151412",
        // Brown shades
        primary: "#D2996F",
        secondary: "#30271c",
      },
    },
  },
  plugins: [],
};
