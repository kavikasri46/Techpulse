/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zoho: {
          red: {
            DEFAULT: '#E42528',
            hover: '#C71B1E',
            light: '#FEF2F2',
            border: '#FCA5A5',
          },
          green: {
            DEFAULT: '#009639',
            hover: '#007A2E',
            light: '#F0FDF4',
          },
          blue: {
            DEFAULT: '#0F65AF',
            hover: '#0B4D85',
            light: '#EFF6FF',
          },
          yellow: {
            DEFAULT: '#FFC600',
            hover: '#E5B200',
          },
          dark: '#1A1A1A',
          charcoal: '#2D3748',
          muted: '#6B7280',
          surface: '#F8F9FA',
          border: '#E5E7EB',
        },
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#E42528',
          600: '#C71B1E',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#450A0A',
        }
      },
      fontFamily: {
        sans: ['Puvi', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}
