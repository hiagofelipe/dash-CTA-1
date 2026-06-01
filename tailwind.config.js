/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        bg: '#0a0a0a',
        card: '#111111',
        border: '#1f1f1f',
        textPrimary: '#e5e5e5',
        textMuted: '#6b6b6b',
        gold: '#efbe4e',
        consultoria: '#2d6a47',
        consultoriaBorder: '#1b4332',
        analitica: '#2563a8',
        analiticaBorder: '#1e3a70',
      },
    },
  },
  plugins: [],
}
