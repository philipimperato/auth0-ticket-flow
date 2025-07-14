<script setup lang="ts">
import * as v from "valibot";
import type { FormError } from "@nuxt/ui";

const validate = (state: any): FormError[] => {
  const result = v.safeParse(schema, state);
  if (result.success) return [];

  return result.issues.map((issue) => ({
    name: issue.path?.[0]?.key as string,
    message: issue.message
  }));
};

const schema = v.object({
  // client
  clientName: v.pipe(v.string(), v.nonEmpty("Client name is required")),
  timezone: v.pipe(v.string(), v.nonEmpty("Timezone is required")),

  // profile
  email: v.pipe(v.string(), v.nonEmpty("Email is required"), v.email("Please enter a valid email")),
  firstName: v.pipe(v.string(), v.nonEmpty("First name is required")),
  lastName: v.pipe(v.string(), v.nonEmpty("Last name is required")),

  // customer
  zip: v.pipe(
    v.string(),
    v.nonEmpty("ZIP code is required"),
    v.regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code (12345 or 12345-6789)")
  ),
  packageName: v.pipe(v.string(), v.nonEmpty("Package name is required"))
});

const state = ref({
  // client
  clientName: "",
  timezone: "",

  // profile
  email: "",
  firstName: "",
  lastName: "",

  // customer
  zip: "",
  packageName: "195_unlimited_annual"
});

const finishSignup = async () => {
  try {
    await $fetch("/api/signup", {
      method: "POST",
      body: state.value
    });
    navigateTo("/");
  } catch (error) {
    console.error("Post failed:", error);
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
    <h2
      class="text-xl font-semibold text-gray-400 px-8 py-4 flex items-center border-b border-gray-800 sticky top-0 z-10 bg-gray-900"
    >
      Sign Up for<span class="text-primary">&nbsp;Startup</span>
      <UButton
        @click="$emit('close-slideover')"
        size="xl"
        icon="i-lucide-x"
        type="button"
        color="primary"
        variant="ghost"
        class="ml-auto"
      />
    </h2>

    <div class="p-8">
      <div class="border-b border-gray-800 pb-4 mb-8">
        <h3 class="text-base font-semibold text-gray-400 flex items-center gap-2">
          <UIcon name="i-lucide-building" class="text-white" />
          Organization
        </h3>
      </div>

      <div class="space-y-4">
        <UFormField label="Name" name="clientName">
          <UInput
            size="xl"
            v-model="state.clientName"
            color="primary"
            class="w-full"
            icon="i-lucide-building"
          />
        </UFormField>
        <UFormField label="Timezone" name="timezone">
          <TimezoneSelect size="xl" v-model="state.timezone" />
        </UFormField>
      </div>

      <div class="border-b border-gray-800 pb-4 my-8">
        <h3 class="text-base font-semibold text-gray-400 flex items-center gap-2">
          <UIcon name="i-lucide-user" class="text-white" />
          Profile
        </h3>
      </div>

      <div class="space-y-4">
        <UFormField label="Email" name="email">
          <UInput
            size="xl"
            v-model="state.email"
            color="primary"
            class="w-full"
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
      </div>

      <div class="border-b border-gray-800 pb-4 my-8">
        <h3 class="text-base font-semibold text-gray-400 flex items-center gap-2">
          <UIcon name="i-lucide-credit-card" class="text-white" />
          Billing
        </h3>
      </div>

      <div class="space-y-4">
        <UFormField label="Zip" name="zip">
          <UInput
            size="xl"
            v-model="state.zip"
            color="primary"
            class="w-full"
            icon="i-lucide-map-pin"
          />
        </UFormField>
      </div>
    </div>

    <div class="border-t border-gray-800 my-8 px-8 sticky bottom-0 bg-gray-900 py-5">
      <UButton size="xl" label="Sign up" type="submit" color="primary" class="w-full" block />
    </div>
  </UForm>
</template>
