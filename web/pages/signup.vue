<script lang="ts" setup>
import type { FormError, TimelineItem } from "@nuxt/ui";
import * as v from "valibot";

definePageMeta({
  layout: "center-card"
});

const { user, clear } = useUserSession();

const logout = async () => {
  await clear();
  useRouter().push("/");
};

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
  firstName: v.string(),
  lastName: v.string(),
  timezone: v.nullable(v.string()),
  selectedPlan: v.number()
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.firstName) errors.push({ name: "firstName", message: "Required" });
  if (!state.lastName) errors.push({ name: "lastName", message: "Required" });
  if (!state.timezone) errors.push({ name: "timezone", message: "Required" });
  return errors;
};

const state = ref({
  firstName: "",
  lastName: "",
  timezone: null,
  selectedPlan: 0
});

const finishSignup = async () => {
  try {
    await $fetch("/api/users/signup", {
      method: "PATCH",
      body: state.value
    });

    navigateTo("/");
  } catch (error) {
    console.error("Patch failed:", error);
    throw error;
  }
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
        <h1 class="mt-4 text-2xl">Complete Sign up</h1>

        <USeparator class="mt-4 mb-12" />

        <UTimeline :items="items" size="lg">
          <template #title="{ item }">
            <h3 class="text-xl mb-0">{{ item.title }}</h3>

            <div class="flex flex-col gap-4 mt-4 w-full space-y-2">
              <template v-if="item.title === 'Profile Information'">
                <div class="font-normal text-muted mb-1 -mt-2">Finish setting up your profile</div>

                <UFormField label="Email" name="email">
                  <UInput
                    size="xl"
                    color="primary"
                    variant="subtle"
                    :value="user?.email"
                    class="w-full"
                    disabled
                    icon="i-lucide-mail"
                  />
                </UFormField>

                <UFormField label="First Name" name="firstName">
                  <UInput
                    size="xl"
                    v-model="state.firstName"
                    label="First name"
                    class="w-full"
                    placeholder="Enter your first name"
                    icon="i-lucide-user"
                  />
                </UFormField>
                <UFormField label="Last Name" name="lastName">
                  <UInput
                    size="xl"
                    class="w-full"
                    v-model="state.lastName"
                    label="Last name"
                    placeholder="Enter your last name"
                    icon="i-lucide-user"
                  />
                </UFormField>
                <UFormField label="Timezone" name="timezone">
                  <TimezoneSelect size="xl" v-model="state.timezone" />
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
        <div class="flex justify-between">
          <UButton
            size="xl"
            label="Cancel"
            type="button"
            color="secondary"
            class="px-8"
            @click="logout"
          />
          <UButton size="xl" label="Sign up" type="submit" color="primary" class="px-8" />
        </div>
      </div>
    </div>
  </UForm>
</template>
