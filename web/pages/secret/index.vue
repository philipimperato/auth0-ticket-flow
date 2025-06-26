<script setup>
const data = await $fetch("/api/session");
</script>

<template>
  <pre
    class="p-4 w-10/12 text-xs font-mono text-gray-200 whitespace-pre-wrap break-all word-break-break-all"
    >{{ data }}</pre
  >
</template>
