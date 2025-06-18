<script setup lang="ts">
definePageMeta({ layout: "empty", middleware: [] });

const navigateToLogin = () => {
  window.location.href = "/auth/auth0";
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <UCard>
      <template #header>
        <h1 class="text-2xl">Welcome to Auth0 invite flow</h1>
      </template>

      <template #default>
        <div class="my-4">
          <UButton label="Login with Auth0" block class="cursor-pointer" @click="navigateToLogin" />
        </div>
      </template>

      <template #footer>
        <span class="text-xs text-gray-400">Powered by Auth0</span>
      </template>
    </UCard>
  </div>
</template>
