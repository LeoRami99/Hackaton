import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  //       'gradient-conic':
  //         'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  //     },
  //   },
  // },
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
                      
            "success": "#86fcbb",
                      
            "warning": "#FFCF00",
                      
            "error": "#ff0000",
          },
        },
      ],
    },
}
export default config
