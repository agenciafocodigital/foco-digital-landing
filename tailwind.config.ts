import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "azul-noche": "#081F35",
        "amarillo-foco": "#FFC928",
        "azul-electrico": "#24B9F2"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(8, 31, 53, 0.62)",
        glow: "0 0 0 1px rgba(36, 185, 242, 0.32), 0 20px 45px rgba(8, 31, 53, 0.58)"
      }
    }
  },
  plugins: []
};

export default config;
