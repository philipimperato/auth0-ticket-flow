<template>
  <div style="max-width: 600px">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">ID Token</h2>

    <!-- Token Display Container -->
    <div class="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <!-- Header with copy button -->
      <div class="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <span class="text-sm font-medium text-gray-700">JWT Token</span>
        <button
          @click="copyToken"
          class="flex items-center space-x-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors"
        >
          <span>{{ copied ? "✓ Copied!" : "📋 Copy" }}</span>
        </button>
      </div>

      <!-- Token content - clickable and wrappable -->
      <pre
        @click="copyToken"
        class="p-4 text-xs font-mono text-gray-800 cursor-pointer hover:bg-gray-100 transition-colors whitespace-pre-wrap break-all word-break-break-all select-all leading-relaxed"
        :class="{ 'bg-green-50': copied }"
        >{{ token }}</pre
      >

      <!-- Helper text -->
      <div class="px-4 py-2 bg-gray-50 border-t border-gray-200">
        <p class="text-xs text-gray-500">Click anywhere on the token to copy it to clipboard</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const copied = ref(false);
const { data } = await useFetch("/api/session");

const token = ref(data.value?.secure?.idToken);

const copyToken = async () => {
  try {
    await navigator.clipboard.writeText(token.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy token:", err);
  }
};
</script>
