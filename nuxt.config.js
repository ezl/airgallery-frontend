export default {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL,
    API_BASE_URL: process.env.API_BASE_URL
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Kettle Stitch: Galleries w/ Friends",
    htmlAttrs: {
      lang: "en",
      'data-theme': "forest"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "true" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Lora:wght@500&family=Poppins:ital,wght@0,100;0,300;0,600;1,100;1,300&display=swap" },

      { rel:"apple-touch-icon", sizes:"180x180", href:"/apple-touch-icon.png" },
      { rel:"icon", type:"image/png", sizes:"32x32", href:"/favicon-32x32.png" },
      { rel:"icon", type:"image/png", sizes:"16x16", href:"/favicon-16x16.png" },
      { rel:"manifest", href:"/site.webmanifest" },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  axios: {
    baseURL: process.env.API_BASE_URL
  },

  auth: {
    strategies: {
      local: {
        cookie: false,
        scheme: "local",
        endpoints: {
          user: { url: "/auth/user", method: "get" }
        }
      }
    },
    redirect: {
      login: "/",
      logout: "/",
      callback: "/login",
      home: "/home"
    }
  },

  router: {
    middleware: ["auth"]
  }
};
