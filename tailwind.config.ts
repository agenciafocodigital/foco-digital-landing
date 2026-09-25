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
        "azul-profundo": "#113D55",
        "amarillo-foco": "#FFC928",
        "azul-electrico": "#24B9F2",
        "blanco-calido": "#F7F9FB",
        "rojo-perdida": "#B42318"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(8, 31, 53, 0.12)",
        glow: "0 0 0 1px rgba(36, 185, 242, 0.22), 0 20px 45px rgba(8, 31, 53, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
