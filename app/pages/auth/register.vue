<template>
  <div class="flex min-h-screen">
    <!-- Left side - Form -->
    <div class="flex w-1/2 items-center justify-center bg-color-primary px-16">
      <form class="w-full max-w-md space-y-8">
        <h1 class="text-4xl font-bold text-white">S'inscrire</h1>
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="mb-2 block text-sm text-white" for="firstname"
                >Prénom</label
              >
              <UiInput
                id="firstname"
                v-model="form.firstname"
                type="text"
                required
                :error="!!fieldErrors.firstname"
              />
              <p v-if="fieldErrors.firstname" class="mt-1 text-sm text-red-200">
                {{ fieldErrors.firstname }}
              </p>
            </div>
            <div>
              <label class="mb-2 block text-sm text-white" for="lastname"
                >Nom</label
              >
              <UiInput
                id="lastname"
                v-model="form.lastname"
                type="text"
                required
                :error="!!fieldErrors.lastname"
              />
              <p v-if="fieldErrors.lastname" class="mt-1 text-sm text-red-200">
                {{ fieldErrors.lastname }}
              </p>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm text-white" for="email"
              >Email</label
            >
            <UiInput
              id="email"
              v-model="form.email"
              type="email"
              required
              :error="!!fieldErrors.email"
            />
            <p v-if="fieldErrors.email" class="mt-1 text-sm text-red-200">
              {{ fieldErrors.email }}
            </p>
          </div>

          <div>
            <label class="mb-2 block text-sm text-white" for="number"
              >Numéro de téléphone</label
            >
            <UiInput
              id="number"
              v-model="form.number"
              type="tel"
              :error="!!fieldErrors.number"
            />
            <p v-if="fieldErrors.number" class="mt-1 text-sm text-red-200">
              {{ fieldErrors.number }}
            </p>
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
              :error="!!fieldErrors.password"
            />
            <p v-if="fieldErrors.password" class="mt-1 text-sm text-red-200">
              {{ fieldErrors.password }}
            </p>
          </div>
        </div>

        <button
          type="button"
          :disabled="loading"
          class="w-full max-w-xs rounded-lg bg-[#F5A623] py-3 text-xl font-bold text-white transition-colors hover:bg-[#e0951e] disabled:opacity-50"
          @click="register"
        >
          {{ loading ? "Inscription..." : "S'inscrire" }}
        </button>

        <p class="text-sm text-white">
          <NuxtLink to="/auth/login" class="underline"
            >Déjà un compte ? Se connecter</NuxtLink
          >
        </p>
      </form>
    </div>

    <!-- Right side - Logo & description -->
    <AuthBranding />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const { fieldErrors, parseError, clear } = useAuthErrors();

const form = reactive({
  firstname: "",
  lastname: "",
  email: "",
  number: "",
  password: "",
});

const loading = ref(false);

async function register() {
  clear();
  loading.value = true;
  try {
    await authStore.register(form);
    await navigateTo("/dashboard");
  } catch (e: unknown) {
    parseError(e);
  } finally {
    loading.value = false;
  }
}
</script>
