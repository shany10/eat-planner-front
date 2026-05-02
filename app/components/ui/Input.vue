<template>
  <input
    :value="props.modelValue ?? ''"
    :disabled="props.disabled || false"
    :aria-invalid="props.error || undefined"
    :class="mergedClass"
    v-bind="$attrs"
    @input="onInput"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number | null;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  error?: boolean;
  class?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue" | "input", value: string): void;
}>();

const classesByVariant: Record<NonNullable<typeof props.variant>, string> = {
  primary: `w-full rounded-lg bg-white px-4 py-3 text-gray-900 
    focus:outline-none focus:ring-2 focus:ring-yellow-400
`,
  secondary: "bg-gray-500 text-white",
};

const mergedClass = computed(() => {
  const extra = props.class ?? "";
  const errorClass = props.error
    ? "border border-red-400 ring-red-300 focus:ring-red-300"
    : "";
  return `${classesByVariant[props.variant ?? "primary"]} ${errorClass} ${extra}`;
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  const next = target?.value ?? "";
  emit("update:modelValue", next);
  emit("input", next);
};
</script>
