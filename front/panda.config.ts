import { defineConfig } from "@pandacss/dev";
import { colors } from "./app/styles/colors";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./app/routes/**/*.{ts,tsx,js,jsx}", "./app/components/**/*.{ts,tsx,js,jsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors,
        fonts: {
          body: { value: 'system-ui, sans-serif' }
        }
      }
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
