/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        police: {
          900: '#0a1128', // Darkest Navy
          850: '#0e1738',
          800: '#14214d', // Dark Navy Sidebar
          700: '#1c2f6c',
          600: '#254091',
          500: '#2e54b6',
        },
        navy: {
          900: '#070d1e',
          800: '#0c162d',
          700: '#132142',
          600: '#1c2d59',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8fafc',
          subtle: '#f1f5f9',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
