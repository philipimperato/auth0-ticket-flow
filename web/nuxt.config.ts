import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@nuxt/ui-pro", "nuxt-auth-utils"],
  vite: {
    plugins: [tailwindcss()]
  },
  fonts: {
    defaults: {
      weights: [400, 700]
    }
  },
  css: ["~/assets/css/main.css"]
});
