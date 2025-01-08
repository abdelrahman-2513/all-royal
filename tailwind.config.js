const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ------------ primary ------------
        primary: "#3271ff",
        primaryHover: "#165dff0f",
        lightblack: "#101113",
        // ------------ Text ------------
        lightblue: "#101113",
        gray: "#cdcdcd", //gray on hover
        softGray: "#f6f8ff",
        lightGray: "#ffffff99", //gray on hover
        purple: "#7a39ff",
        dodgerblue: "#165dff",
        green: "#039f52",
        "soft-gray": "#E8E8E8",
        "shadow-color": "#0000008f",
        lb: {
          // landing page colors
          black: "#030115",
          lightPurple: "#731792",
        },
      },
      boxShadow: {
        xl: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)",
      },
      spacing: {
        xss: ".25rem",
        xs: "0.5rem",
        sm: "0.75rem",
        base: "1rem",
        md: "1.25rem",
        lg: "1.5rem",
        xl: "1.75rem",
        "2xl": "2rem",
        "3xl": "2.25rem",
        "4xl": "2.5rem",
        "5xl": "2.75rem",
      },
      // backgroundImage: {
      //   lines: "url('./src/assets/landingPage/lines.svg')",
      // },
    },
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
    },
  },
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "#3271ff",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#B4D9F6",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
  plugins: [
    require("tailwindcss"),
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("autoprefixer"),
  ],
});
