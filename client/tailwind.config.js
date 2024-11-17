module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to your files
  ],
  plugins: [],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "768px" },
      sm: { max: "639px" },
      xs: { max: "500px" },
      xxs: { max: "375px" },
    },
    colors: {
      white: "#FFFFFF",
      cream: "#efece8",
      black: "#160f0f",
      green: "#334a3b",
      brown: "#6a4f31",
      red: "#e52b50",
    },
    fontSize: {
      xs: ["0.75rem", "0.75rem"],
      sm: ["0.875rem", "0.875rem"],
      regular: ["1rem", "1rem"],
      lg: ["1.25rem", "1.25rem"],
      xl: ["1.5rem", "1.5rem"],
      xxl: ["2rem", "2rem"],
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: 0,
          },
          "50%": {
            width: "100%",
          },
          "55%, 65%, 75%": {
            opacity: 1,
          },
          "60%, 70%": {
            opacity: 0,
          },
          "80%": {
            width: "100%",
          },
          "100%": {
            width: 0,
          },
        },
      },
      animation: {
        typing: "typing 4s steps(12) infinite",
        blink: "blink 0.3s infinite",
      },
      boxShadow: {
        DEFAULT: "0px 4px 4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
};
