/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        login:"rgba(0, 0, 0, 0.35) 0px 5px 15px"
      },
      colors:{
        nav:{
          main:"#A6ADB4"
        },
        primary:"#1677FF",
        danger:"#FF4D4F",
        main:"#E3EFFE"
        
      }
    },
  },
  plugins: [],
}

