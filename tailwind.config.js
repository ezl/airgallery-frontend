module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms', {
      strategy: 'base'
    }),
    require("@tailwindcss/typography"),
    require("daisyui")
    ],
  daisyui: {
    styled: true,
    themes: ["light", "dark", "forest", "aqua", "lofi", "night"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark"
  }
};
