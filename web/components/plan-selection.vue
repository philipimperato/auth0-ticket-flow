<template>
  <div class="flex flex-col gap-y-6 lg:grid lg:grid-cols-2 lg:gap-x-6">
    <div
      v-for="(plan, index) in plans"
      :key="index"
      class="relative cursor-pointer rounded-lg bg-gray-900 p-6 transition-all duration-200 border-2 border-dashed border-gray-300"
      :class="{
        'bg-gray-800 shadow-md': selectedPlan === index,
        'border-gray-600': selectedPlan !== index
      }"
      @click="selectPlan(index)"
    >
      <!-- Radio indicator -->
      <div class="absolute top-4 right-4">
        <div
          class="h-6 w-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
          :class="{
            'border-gray-200 bg-gray-200': selectedPlan === index,
            'border-gray-600 bg-gray-600': selectedPlan !== index
          }"
        >
          <svg
            v-if="selectedPlan === index"
            class="h-4 w-4 text-gray-800"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <!-- Plan content -->
      <div class="pr-8">
        <!-- Smaller title -->
        <h3 class="text-lg font-semibold text-gray-100 mb-2">
          {{ plan.title }}
        </h3>

        <!-- Price -->
        <div class="mb-4">
          <span class="text-3xl font-bold text-gray-100">
            {{ plan.price }}
          </span>
        </div>

        <!-- Features -->
        <ul class="space-y-2">
          <li
            v-for="feature in plan.features"
            :key="feature"
            class="flex items-start text-sm text-gray-100"
          >
            <svg
              class="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface PricingPlan {
  title: string;
  price: string;
  features: string[];
}

const props = defineProps<{
  plans: PricingPlan[];
  modelValue?: number;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number];
  planSelected: [plan: PricingPlan, index: number];
}>();

const selectedPlan = ref(props.modelValue ?? 0);

const selectPlan = (index: number) => {
  selectedPlan.value = index;
  emit("update:modelValue", index);
  emit("planSelected", props.plans[index], index);
};
</script>
