import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        light: {
          background: "#F5F5F5",
          text: "#333333",
          link: "#007BFF",
          buttonPrimary: "#007BFF",
          buttonSecondary: "#6C757D",
          border: "#DDDDDD",
        },
        dark: {
          background: "#121212",
          text: "#E0E0E0",
          link: "#1E90FF",
          buttonPrimary: "#1E90FF",
          buttonSecondary: "#343A40",
          border: "#333333",
        },
      },
      screens: {
        xs: "330px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
export default config;
