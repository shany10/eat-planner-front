

import type { User } from "../type/userType";


export const useAuthStore = defineStore("auth", () => {
  const { $fetch } = useNuxtApp();

  const user = ref<User | null>(null);
  const loading = ref(false);

  async function login(email: string, password: string) {
    loading.value = true;
    try {
      const data = await $fetch<User>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      user.value = data;
    } finally {
      loading.value = false;
    }
  }

  async function fetchMe() {
    try {
      const headers = useRequestHeaders(["cookie"]);
      const data = await $fetch<User>("/api/auth/me", { headers });
      user.value = data;
    } catch {
      user.value = null;
    }
  }

  async function logout() {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Cookie will be cleared server-side regardless
    } finally {
      user.value = null;
      navigateTo("/auth/login");
    }
  }

  const isAdmin = computed(() => user.value?.role === "ADMIN");
  const isManager = computed(() =>
    ["ADMIN", "MANAGER"].includes(user.value?.role ?? ""),
  );

  return { user, loading, login, fetchMe, logout, isAdmin, isManager };
});
