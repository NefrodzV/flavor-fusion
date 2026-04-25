import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // 'crimson' is the utility class: font-crimson
        // 'CrimsonBold' is the name from your @font-face
        crimson: ["CrimsonBold", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
