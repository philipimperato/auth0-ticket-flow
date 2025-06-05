import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
<<<<<<< HEAD
  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@nuxt/ui-pro", "nuxt-auth-utils"],
=======
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "nuxt-auth-utils"
  ],
>>>>>>> 8038b82 (feat(login-page): Install tailwind & Nuxt ui (#1))
  vite: {
    plugins: [tailwindcss()]
  },
  fonts: {
    defaults: {
      weights: [400, 700]
    }
  },
<<<<<<< HEAD
  css: ["~/assets/css/main.css"]
});
=======
  ui: {
    prefix: ""
  },
  css: ["~/assets/css/main.css"]
});
>>>>>>> 8038b82 (feat(login-page): Install tailwind & Nuxt ui (#1))
