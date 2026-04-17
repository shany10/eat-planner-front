<script setup>
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-blue-500">
    <div class="rounded-lg bg-white p-8 shadow-xl">
      <h1 class="mb-4 text-4xl font-bold text-gray-800">
        Test Tailwind
      </h1>
      <p class="text-xl text-gray-600">
        Coucou avec Tailwind CSS
      </p>
      <UButton class="mt-4">
        Bouton Nuxt UI
      </UButton>
    </div>
  </div>
</template>
