import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: { 
        'popover': '0px 4px 10px rgba(0, 0, 0, 0.2)',
      },
      borderColor: {
        'popover': '#a0aec0',
      },
      colors:{
        'popover-background': '#f7fafc',
      }
    },
  },
  plugins: [],
}
export default config
