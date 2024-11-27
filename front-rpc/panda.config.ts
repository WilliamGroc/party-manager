import { defineConfig } from "@pandacss/dev";
// https://mantine.dev/colors-generator/
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
          secondary: { value: '#88e0c1' },
          lgreen: { value: '#b9e1ba' },
          green: { value: '#4CAF50' },
          dgreen: { value: '#388E3C' },
          lred: { value: '#fca6a0' },
          red: { value: '#F44336' },
          dred: { value: '#D32F2F' },
          lyellow: { value: '#fffacb' },
          yellow: { value: '#FFEB3B' },
          dyellow: { value: '#FBC02D' },
          lorange: { value: '#ffd79b' },
          orange: { value: '#FF9800' },
          dorange: { value: '#F57C00' },
          grey: { value: '#F5F5F5' },
          dgrey: { value: '#555555' },
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
