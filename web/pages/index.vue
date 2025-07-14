<script setup lang="ts">
definePageMeta({ layout: "center-card", middleware: [] });

const open = ref(false);
const plans = ref([
  {
    title: "Solo",
    description: "Tailored for indie hackers.",
    price: "$249",
    features: ["One developer", "Lifetime access"],
    button: {
      label: "Buy now"
    }
  },
  {
    title: "Startup",
    description: "Best suited for small teams.",
    price: "$499",
    features: ["Up to 5 developers", "Everything in Solo"],
    button: {
      label: "Buy now",
      onClick: () => {
        open.value = true;
      }
    }
  },
  {
    title: "Organization",
    description: "Ideal for larger teams and organizations.",
    price: "$999",
    features: ["Up to 20 developers", "Everything in Startup"],
    button: {
      label: "Buy now"
    }
  }
]);
</script>

<template>
  <UPricingPlans :plans="plans" />

  <USlideover v-model:open="open" :dismissible="false">
    <template #content>
      <div class="overflow-y-scroll">
        <SignUpForm @close-slideover="open = false" />
      </div>
    </template>
  </USlideover>
</template>
