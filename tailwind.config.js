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
      screens: {
        sm: "425px",
        md: "768px",
        lg: "1020px",
        xl: "1440px",
        "2xl": "1920px",
      },
    },
  },
  themes: ["light", "dark", "cupcake"],
  plugins: [require("daisyui")],
};
