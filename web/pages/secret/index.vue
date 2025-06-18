<script setup lang="ts">
const { data } = await useFetch("/api/session");
</script>

<template>
  <h1>Secret</h1>
  <pre
    class="p-6 max-w-xl text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap break-words overflow-x-auto"
    >{{ data }}</pre
  >
</template>
