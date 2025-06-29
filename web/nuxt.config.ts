import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@nuxt/ui-pro", "nuxt-auth-utils"],
  vite: {
    plugins: [tailwindcss()]
  },
  devServer: {
    port: 5002,
    host: '0.0.0.0'
  },
  fonts: {
    defaults: {
      weights: [400, 700]
    }
  },
  css: ["~/assets/css/main.css"]
});
