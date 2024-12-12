/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./pages/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./src/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbar
  ],
}
