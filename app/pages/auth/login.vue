<template>
  <div class="flex min-h-screen">
    <div class="flex w-1/2 items-center justify-center bg-color-primary px-16">
      <form class="w-full max-w-md space-y-8">
        <h1 class="text-4xl font-bold text-white">Se connecter</h1>

        <AuthError :errors="errors" />

        <div class="space-y-6">
          <div>
            <label class="mb-2 block text-sm text-white" for="email"
              >Email</label
            >
            <UiInput
              id="email"
              v-model="form.email"
              type="email"
              required
              variant="primary"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm text-white" for="password"
              >Mot de passe</label
            >
            <UiInput
              id="password"
              v-model="form.password"
              type="password"
              required
              variant="primary"
            />
          </div>
        </div>

        <UiButton
          :disabled="loading"
          variant="primary"
          type="submit"
          @click="login"
        >
          {{ loading ? "Connexion..." : "Se connecter" }}
        </UiButton>

        <p class="text-sm text-white">
          <NuxtLink to="/auth/register" class="underline"
            >Vous n'avez pas de compte ? S'inscrire !</NuxtLink
          >
        </p>
      </form>
    </div>
    <AuthBranding />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const { loading } = storeToRefs(authStore);
const { errors, parseError, clear } = useAuthErrors();

const form = reactive({
  email: "",
  password: "",
});

async function login() {
  clear();
  try {
    await authStore.login(form.email, form.password);
    await navigateTo("/dashboard");
  } catch (e: unknown) {
    parseError(e);
  }
}
</script>
