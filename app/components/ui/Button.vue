<template>
  <button
    :type="props.type ?? 'button'"
    :disabled="props.disabled || false"
    :class="mergedClass"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { ButtonVariant } from "~/type/buttonType";

const props = defineProps<{
  variant?: ButtonVariant;
  disabled?: boolean;
  class?: string;
  type?: "button" | "submit" | "reset";
}>();

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const classesByVariant: Record<ButtonVariant, string> = {
  primary: `py-3 w-full max-w-xs rounded-lg bg-[#F5A623] text-xl 
    font-bold text-white transition-colors hover:bg-[#e0951e] 
    disabled:opacity-50`,
  secondary: "bg-gray-500 text-white",
};

const mergedClass = computed(() => {
  const extra = props.class ?? "";
  return `${classesByVariant[props.variant ?? "primary"]} ${extra}`;
});

function onClick(event: MouseEvent) {
  emit("click", event);
}
</script>
