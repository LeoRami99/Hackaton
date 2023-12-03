import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("daisyui")],
   daisyui: {
      themes: [
        {
          mytheme: {                      
            "primary": "#DDA060",
                      
            "secondary": "#F0B50E",
                      
            "accent": "#ffffff",
                      
            "neutral": "#ffffff",
                      
            "base-100": "#ffffff",
                      
            "info": "#ffffff",
                      
            "success": "#55E038",
                      
            "warning": "#FFCF00",
                      
            "error": "#ff0000",
          },
        },
      ],
    },
}
export default config
