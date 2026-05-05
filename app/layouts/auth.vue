<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex min-h-screen">
      <div
        class="flex w-full items-center justify-center bg-color-primary px-6 py-12 md:w-1/2 md:px-16"
      >
        <div class="w-full max-w-md">
          <slot />
        </div>
      </div>
      <AuthBranding />
    </div>
  </div>
</template>
