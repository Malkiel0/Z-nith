// Configuration Tailwind CSS pour Zénith (Frontend)
// Clean code, dark mode activé (class), prêt pour animations et thèmes dynamiques

module.exports = {
  darkMode: 'class', // Permet le dark mode via la classe 'dark' sur <html> ou <body>
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zenith: {
          DEFAULT: '#0f3460', // Couleur principale Zénith
          accent: '#ff6f61', // Accent dynamique
        },
      },
      animation: {
        fadein: 'fadeIn 0.8s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
