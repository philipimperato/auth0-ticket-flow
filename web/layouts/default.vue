<script setup lang="ts">
const open = ref(false);

const links = [
  {
    label: "Inviters",
    icon: "i-heroicons-user",
    to: "/inviters"
  },
  {
    label: "Invitees",
    icon: "i-heroicons-user-group",
    to: "/invitees"
  }
];
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <h1>Auth0 invite flow</h1>
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links"
          orientation="vertical"
          tooltip
          popover
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>
