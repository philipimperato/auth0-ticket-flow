<script lang="ts" setup>
import type { FormError, TimelineItem } from "@nuxt/ui";
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

type Schema = v.InferOutput<typeof schema>;

definePageMeta({
  layout: "center-card"
});

const items = [
  {
    title: "Profile Information",
    icon: "i-lucide-user"
  },
  {
    title: "Select your plan",
    icon: "i-lucide-wallet"
  }
] satisfies TimelineItem[];

const plans = [
  {
    title: "Professional",
    price: "$100/m",
    features: ["10 users", "10 projects", "100GB storage"]
  },
  {
    title: "Enterprise",
    price: "$1000/m",
    features: ["100 users", "100 projects", "1TB storage"]
  }
];

const schema = v.object({
  firstname: v.string(),
  lastname: v.string(),
  timezone: v.nullable(v.string()),
  selectedPlan: v.number()
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.firstname) errors.push({ name: "firstname", message: "Required" });
  if (!state.lastname) errors.push({ name: "lastname", message: "Required" });
  if (!state.timezone) errors.push({ name: "timezone", message: "Required" });
  if (!state.selectedPlan) errors.push({ name: "selectedPlan", message: "Required" });
  return errors;
};

const state = ref({
  firstname: "",
  lastname: "",
  timezone: null,
  selectedPlan: 0
});

const finishSignup = (event: FormSubmitEvent<Schema>) => {
  console.log(state);
};
</script>

<template>
  <UForm
    :validate="validate"
    :schema="schema"
    :state="state"
    class="flex flex-col h-full w-full"
    @submit="finishSignup"
  >
    <div class="max-w-3xl mx-auto">
      <div class="flex-grow overflow-auto space-y-4 pb-24">
        <h1 class="text-2xl">Complete Sign up</h1>

        <USeparator class="mt-4 mb-12" />

        <UTimeline :items="items" size="lg">
          <template #title="{ item }">
            <h3 class="text-xl mb-0">{{ item.title }}</h3>

            <div class="flex flex-col gap-4 mt-4 w-full">
              <template v-if="item.title === 'Profile Information'">
                <div class="font-normal text-muted mb-1 -mt-2">Finish setting up your profile</div>

                <UFormField label="Firstname" name="firstname">
                  <UInput
                    v-model="state.firstname"
                    label="Firstname"
                    class="w-full"
                    placeholder="Enter your firstname"
                    icon="i-lucide-user"
                  />
                </UFormField>
                <UFormField label="Lastname" name="lastname">
                  <UInput
                    class="w-full"
                    v-model="state.lastname"
                    label="Lastname"
                    placeholder="Enter your lastname"
                    icon="i-lucide-user"
                  />
                </UFormField>
                <UFormField label="Timezone" name="timezone">
                  <TimezoneSelect v-model="state.timezone" />
                </UFormField>
              </template>

              <template v-if="item.title === 'Select your plan'">
                <PlanSelection :plans="plans" v-model="state.selectedPlan" />
              </template>
            </div>
          </template>
        </UTimeline>
      </div>
      <div class="fixed bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900 pr-4">
        <div class="flex justify-end">
          <UButton size="lg" label="Sign up" type="submit" color="primary" class="px-8" />
        </div>
      </div>
    </div>
  </UForm>
</template>
