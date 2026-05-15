<template>
  <span :class="mergedClass" :style="maskStyle" v-bind="a11yAttrs" />
</template>

<script setup lang="ts">
import type { IconType } from "~/type/iconType";

const props = defineProps<{
  type: IconType;
  class?: string;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg";
}>();

const iconUrl = computed(() => `/icons/${props.type}.svg`);

const sizeClass = computed(() => {
  if (props.size === "sm") return "h-4 w-4";
  if (props.size === "lg") return "h-6 w-6";
  return "h-5 w-5";
});

const mergedClass = computed(() => {
  const extra = props.class ?? "";
  return ["inline-block", "shrink-0", "bg-current", sizeClass.value, extra]
    .filter(Boolean)
    .join(" ");
});

const maskStyle = computed(() => {
  const url = `url('${iconUrl.value}')`;
  return {
    WebkitMaskImage: url,
    maskImage: url,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  } as const;
});

const a11yAttrs = computed(() => {
  if (props.ariaLabel?.trim()) {
    return {
      role: "img",
      "aria-label": props.ariaLabel,
    } as const;
  }
  return {
    "aria-hidden": "true",
  } as const;
});
</script>
