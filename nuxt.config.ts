// https://nuxt.com/docs/api/configuration/nuxt-config
const backendUrl =
  (globalThis as any).process?.env?.BACKEND_URL ?? "http://backend:3000/api";

declare const defineNuxtConfig: (config: unknown) => unknown;

export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@pinia/nuxt", "@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "/api",
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.cjs",
  },

  vite: {
    cacheDir: "/tmp/vite",
  },

  nitro: {
    routeRules: {
      "/api/**": {
        proxy: `${backendUrl}/**`,
      },
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
