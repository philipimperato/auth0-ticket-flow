<script setup lang="ts">
definePageMeta({ layout: "center-card", auth: false });

const navigateToLogin = () => {
  window.location.href = `/auth/auth0?login_hint=${encodeURIComponent("philipimperato@gmail.com")}`;
};

const navigateToRegister = () => {
  window.location.href = "/auth/auth0-signup";
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <UCard
      class="hover:ring-2 ring-primary/25 shadow-primary/10 shadow-xl border border-primary/25"
    >
      <template #header>
        <NuxtImg src="/logo.png" class="mx-auto w-30 h-30 mt-8" />
        <h1 class="text-2xl my-8">Welcome to Auth0 invite flow</h1>
      </template>

      <template #default>
        <div class="my-4">
          <UButton label="Login with Auth0" block class="cursor-pointer" @click="navigateToLogin" />
        </div>

        <USeparator type="dashed" label="or" class="my-8" />

        <div class="my-4">
          <UButton
            label="Register with Auth0"
            block
            variant="outline"
            class="cursor-pointer"
            @click="navigateToRegister"
          />
        </div>
      </template>

      <template #footer>
        <div class="w-full flex items-center justify-center">
          <span class="text-xs text-gray-400">Powered by Auth0 &amp; Nuxt 3</span>
        </div>
      </template>
    </UCard>
  </div>
</template>
