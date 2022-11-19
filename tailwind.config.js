/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./App.{js,jsx,ts,tsx}", 
  "./Page/**/*.{js,jsx,ts,tsx}", 
  // "./Widget/**/*.{js,jsx,ts,tsx}," 
  "./Widget/BottomTab.js",
  "./Widget/BottomSheet.js",
  "./Widget/**/*.{js,jsx,ts,tsx}",
  "./mqtt/Connect.js"
  
],  
  theme: {
    extend: {},
  },
  plugins: [],
}
