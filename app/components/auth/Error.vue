<template>
  <ul
    v-if="errors.length"
    class="list-inside list-disc space-y-1 text-sm text-red-200"
  >
    <li v-for="(err, idx) in errors" :key="idx">{{ err }}</li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  errors: string[];
}>();
</script>
