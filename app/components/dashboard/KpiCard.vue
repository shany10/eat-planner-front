<template>
  <article class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
    <p class="text-xs font-medium uppercase tracking-wide text-gray-500">
      {{ label }}
    </p>
    <p class="mt-2 text-2xl font-bold text-color-primary">
      {{ formattedValue }}
    </p>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: number;
  format?: "currency" | "percent";
}>();

const { format: formatCurrency } = useCurrencyFormat();

const formattedValue = computed(() => {
  if (props.format === "currency") return formatCurrency(props.value);
  if (props.format === "percent") return `${props.value.toFixed(1)}%`;
  return String(props.value);
});
</script>
