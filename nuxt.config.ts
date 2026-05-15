const backendUrl = process.env.BACKEND_URL ?? "http://backend:3000/api";

function normalizeBackend(urlLike: string): {
  origin: string;
  apiPrefix: string;
} {
  try {
    const url = new URL(urlLike);
    const pathname = url.pathname.replace(/\/+$/, "");
    return {
      origin: url.origin,
      apiPrefix: pathname && pathname !== "/" ? pathname : "/api",
    };
  } catch {
    return { origin: urlLike.replace(/\/+$/, ""), apiPrefix: "/api" };
  }
}

const backend = normalizeBackend(backendUrl);

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
    // In dev, `routeRules.proxy` is not consistently applied depending on runtime.
    // `devProxy` ensures `/api/*` is forwarded while running `nuxt dev`.
    devProxy: {
      "/api": {
        // Nitro devProxy strips the mount prefix (`/api`) before forwarding.
        // Point the target at the backend API base so `/api/*` becomes `${apiPrefix}/*`.
        target: `${backend.origin}${backend.apiPrefix}`,
        changeOrigin: true,
      },
    },
    routeRules: {
      "/api/**": {
        proxy: `${backend.origin}${backend.apiPrefix}/**`,
      },
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
