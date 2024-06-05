import { defineConfig } from "@pandacss/dev";

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
        colors: {
          primary: { value: '#29AA7D' },
          secondary: { value: '#8FCCB7' },
          green: { value: '#4CAF50' },
          darkgreen: { value: '#388E3C' },
          red: { value: '#F44336' },
          darkred: { value: '#D32F2F' },
          yellow: { value: '#FFEB3B' },
          darkyellow: { value: '#FBC02D' },
          orange: { value: '#FF9800' },
          darkorange: { value: '#F57C00' },
          grey: { value: '#F5F5F5' },
          darkgrey: { value: '#555555' },
          disable: { value: '#E0E0E0' },
        },
        fonts: {
          body: { value: 'system-ui, sans-serif' }
        }
      }
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
