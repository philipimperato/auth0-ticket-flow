<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: "font-primary"
  }
});
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
