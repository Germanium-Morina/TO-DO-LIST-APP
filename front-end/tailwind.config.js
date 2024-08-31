/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        scrollbar: {
          track: "transparent",
          thumb: "#aaa",
          "hover-track": "#E5E7EB",
          "hover-thumb": "#777",
        },
      },
      width: {
        "scrollbar-thumb": "0.375rem",
        "scrollbar-thumb-hover": "0.625rem",
      },
      transitionProperty: {
        "width-opacity": "width, opacity",
      },
      zIndex: {
        scrollbar: "1035",
      },
      opacity: {
        "scrollbar-visible": "0.6",
        "scrollbar-hover": "0.9",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
      textShadow: {
        DEFAULT: "0 0 1px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".hide-scrollbar::-webkit-scrollbar": {
            display: "none",
          },
          ".hide-scrollbar": {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          },
          ".text-shadow": {
            textShadow: "0 0 1px rgba(0, 0, 0, 0.2)",
          },
          ".last:border-b-0:last-child": {
            "border-bottom-width": "0",
          },
        },
        ["hover"]
      );
    },
  ],
};
