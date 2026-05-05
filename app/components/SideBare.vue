<template>
  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] lg:hidden"
    @click="$emit('closeMobile')"
  />

  <aside
    class="fixed left-0 top-0 z-40 flex h-full w-72 flex-col bg-color-primary text-white transition-all duration-300 lg:w-64"
    :class="[
      mobileOpen ? 'translate-x-0' : '-translate-x-full',
      { 'lg:!w-16': collapsed },
      'lg:translate-x-0',
    ]"
  >
    <!-- Logo -->
    <div
      class="flex h-16 items-center border-b border-white/10"
      :class="
        collapsed && !mobileOpen
          ? 'justify-center px-0'
          : 'justify-between px-4'
      "
    >
      <span
        v-if="!collapsed || mobileOpen"
        class="text-xl font-bold text-color-secondary"
        >Eat Planner</span
      >
      <div class="flex items-center gap-1">
        <button
          class="rounded p-1 hover:bg-white/10 lg:hidden"
          aria-label="Fermer le menu"
          @click="$emit('closeMobile')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button
          class="hidden rounded p-1 hover:bg-white/10 lg:block"
          aria-label="Réduire la barre latérale"
          @click="$emit('toggle')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <nav
      class="flex-1 space-y-1 py-4"
      :class="collapsed ? 'overflow-visible' : 'overflow-y-auto'"
    >
      <NuxtLink
        v-for="item in visibleItems"
        :key="item.to"
        :to="item.to"
        class="group relative flex items-center border-r-4 border-transparent py-3 text-sm transition-colors hover:bg-white/10"
        :class="collapsed && !mobileOpen ? 'justify-center px-0' : 'px-4'"
        active-class="bg-white/15 !border-color-secondary"
        @click="$emit('closeMobile')"
      >
        <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
        <span v-if="!collapsed || mobileOpen" class="ml-3">{{
          item.label
        }}</span>
        <span
          v-if="collapsed && !mobileOpen"
          class="pointer-events-none absolute left-full top-1/2 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded bg-color-primary px-2 py-1 text-sm text-white shadow-lg group-hover:block"
        >
          {{ item.label }}
        </span>
      </NuxtLink>
    </nav>

    <!-- User -->
    <div class="border-t border-white/10 p-4">
      <div class="flex items-center">
        <div
          class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-color-secondary text-sm font-bold text-color-primary"
        >
          {{ userInitials }}
        </div>
        <div v-if="!collapsed || mobileOpen" class="ml-3 overflow-hidden">
          <p class="truncate text-sm font-medium">{{ userName }}</p>
          <span
            class="inline-block rounded-full bg-color-secondary/20 px-2 py-0.5 text-xs text-color-secondary"
            >{{ userRole }}</span
          >
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import IconDashboard from "~/components/icons/IconDashboard.vue";
import IconIngredient from "~/components/icons/IconIngredient.vue";
import IconDish from "~/components/icons/IconDish.vue";
import IconCharge from "~/components/icons/IconCharge.vue";
import IconSale from "~/components/icons/IconSale.vue";
import IconForecast from "~/components/icons/IconForecast.vue";
import IconUsers from "~/components/icons/IconUsers.vue";
import IconSupplier from "~/components/icons/IconSupplier.vue";
import IconStock from "~/components/icons/IconStock.vue";
import IconEstimate from "~/components/icons/IconEstimate.vue";
import IconSettings from "~/components/icons/IconSettings.vue";

interface Props {
  collapsed: boolean;
  mobileOpen: boolean;
}

defineProps<Props>();
defineEmits<{ toggle: []; closeMobile: [] }>();

const authStore = useAuthStore();

const userName = computed(() => {
  const u = authStore.user;
  return u ? `${u.first_name} ${u.last_name}` : "";
});
const userRole = computed(() => authStore.user?.role ?? "");
const userInitials = computed(() => {
  const u = authStore.user;
  if (!u) return "";
  return `${u.first_name?.[0] ?? ""}${u.last_name?.[0] ?? ""}`.toUpperCase();
});

const navItems = [
  {
    to: "/dashboard",
    label: "Tableau de bord",
    icon: IconDashboard,
    roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  {
    to: "/dashboard/ingredients",
    label: "Ingrédients",
    icon: IconIngredient,
    roles: ["ADMIN", "MANAGER"],
  },
  {
    to: "/dashboard/suppliers",
    label: "Fournisseurs",
    icon: IconSupplier,
    roles: ["ADMIN", "MANAGER"],
  },
  {
    to: "/dashboard/stock",
    label: "Stock",
    icon: IconStock,
    roles: ["ADMIN", "MANAGER"],
  },
  {
    to: "/dashboard/estimates",
    label: "Estimation",
    icon: IconEstimate,
    roles: ["ADMIN", "MANAGER"],
  },
  {
    to: "/dashboard/dishes",
    label: "Plats",
    icon: IconDish,
    roles: ["ADMIN", "MANAGER"],
  },
  {
    to: "/dashboard/charges",
    label: "Charges",
    icon: IconCharge,
    roles: ["ADMIN", "MANAGER"],
  },
  {
    to: "/dashboard/sales",
    label: "Ventes",
    icon: IconSale,
    roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  {
    to: "/dashboard/forecasts",
    label: "Prévisions",
    icon: IconForecast,
    roles: ["ADMIN", "MANAGER"],
  },
  {
    to: "/dashboard/users",
    label: "Utilisateurs",
    icon: IconUsers,
    roles: ["ADMIN"],
  },
  {
    to: "/dashboard/settings",
    label: "Mon restaurant",
    icon: IconSettings,
    roles: ["ADMIN", "MANAGER"],
  },
];

const visibleItems = computed(() =>
  navItems.filter((item) => item.roles.includes(authStore.user?.role ?? "")),
);
</script>
