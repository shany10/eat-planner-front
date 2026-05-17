<template>
  <div class="flex min-h-screen bg-gray-50">
    <header>
      <SideBare
        :collapsed="sidebarCollapsed"
        :mobile-open="mobileSidebarOpen"
        @toggle="sidebarCollapsed = !sidebarCollapsed"
        @close-mobile="closeMobileSidebar"
      />
    </header>
    <main class="p-4 sm:p-6">
      <slot />
    </main>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
const sidebarCollapsed = ref(false);
const mobileSidebarOpen = ref(false);
const route = useRoute();

function closeMobileSidebar() {
  mobileSidebarOpen.value = false;
}

function onEscape(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeMobileSidebar();
  }
}

watch(
  () => route.fullPath,
  () => {
    closeMobileSidebar();
  },
);

watch(mobileSidebarOpen, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }
});

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener("keydown", onEscape);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("keydown", onEscape);
    document.body.style.overflow = "";
  }
});
</script>
