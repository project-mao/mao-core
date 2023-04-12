/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Inter'],
      'sans-serif': ['Inter'],
      'mono': ['JetBrains Mono'],
      'body': ['Inter'],
    }
  },
  plugins: [require("daisyui")]
};
