import type { UserLoginType, CreateUserInput } from "../type/userType";

type user = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "manager";
};

type UserLoginResponse = {
  user: user;
  token: string;
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserLoginType | null>(null);
  const loading = ref(false);
  const tokenCookie = useCookie<string | null>("access_token", {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  const token = computed(() => tokenCookie.value ?? null);

  function isUser(value: UserLoginType | null): value is UserLoginType {
    return !!value && typeof value === "object" && "role" in value;
  }

  async function login(email: string, password: string) {
    loading.value = true;
    try {
      const data = await $fetch<UserLoginResponse>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      tokenCookie.value = data.token ?? null;
      user.value = data.user;
      console.log(user.value);
    } finally {
      loading.value = false;
    }
  }

  async function register(form: CreateUserInput) {
    loading.value = true;
    try {
      await $fetch("/api/auth/register", {
        method: "POST",
        body: form,
      });
    } finally {
      loading.value = false;
    }
  }

  async function fetchMe() {
    try {
      const headers: Record<string, string> = {
        ...(import.meta.server ? useRequestHeaders(["cookie"]) : {}),
      };
      if (token.value) {
        headers.Authorization = `Bearer ${token.value}`;
      }
      await $fetch<UserLoginType>("/api/auth/me", { headers });
    } catch {
      user.value = null;
    }
  }

  async function logout() {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
    } finally {
      tokenCookie.value = null;
      user.value = null;
      navigateTo("/auth/login");
    }
  }

  const isAdmin = computed(() =>
    isUser(user.value) ? user.value.role === "admin" : false,
  );
  const isManager = computed(() =>
    isUser(user.value) ? ["admin", "manager"].includes(user.value.role) : false,
  );

  return {
    user,
    loading,
    token,
    login,
    register,
    fetchMe,
    logout,
    isAdmin,
    isManager,
  };
});
