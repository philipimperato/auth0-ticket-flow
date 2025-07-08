<script lang="ts" setup>
const timezone = defineModel<string | null>();

const timezones = [
  { value: "Pacific/Midway", label: "(UTC-11:00) Midway Island, Samoa", offset: "UTC-11:00" },
  { value: "Pacific/Honolulu", label: "(UTC-10:00) Hawaii", offset: "UTC-10:00" },
  { value: "America/Anchorage", label: "(UTC-09:00) Alaska", offset: "UTC-09:00" },
  {
    value: "America/Los_Angeles",
    label: "(UTC-08:00) Pacific Time (US & Canada)",
    offset: "UTC-08:00"
  },
  {
    value: "America/Denver",
    label: "(UTC-07:00) Mountain Time (US & Canada)",
    offset: "UTC-07:00"
  },
  {
    value: "America/Chicago",
    label: "(UTC-06:00) Central Time (US & Canada)",
    offset: "UTC-06:00"
  },
  {
    value: "America/New_York",
    label: "(UTC-05:00) Eastern Time (US & Canada)",
    offset: "UTC-05:00"
  },
  { value: "America/Halifax", label: "(UTC-04:00) Atlantic Time (Canada)", offset: "UTC-04:00" },
  { value: "America/Sao_Paulo", label: "(UTC-03:00) Brasilia", offset: "UTC-03:00" },
  { value: "Atlantic/Azores", label: "(UTC-01:00) Azores", offset: "UTC-01:00" },
  { value: "Europe/London", label: "(UTC+00:00) London, Dublin, Edinburgh", offset: "UTC+00:00" },
  { value: "Europe/Paris", label: "(UTC+01:00) Paris, Amsterdam, Berlin", offset: "UTC+01:00" },
  { value: "Europe/Athens", label: "(UTC+02:00) Athens, Istanbul, Helsinki", offset: "UTC+02:00" },
  { value: "Europe/Moscow", label: "(UTC+03:00) Moscow, Baghdad, Kuwait", offset: "UTC+03:00" },
  { value: "Asia/Dubai", label: "(UTC+04:00) Abu Dhabi, Dubai, Baku", offset: "UTC+04:00" },
  { value: "Asia/Karachi", label: "(UTC+05:00) Islamabad, Karachi, Tashkent", offset: "UTC+05:00" },
  {
    value: "Asia/Kolkata",
    label: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
    offset: "UTC+05:30"
  },
  { value: "Asia/Dhaka", label: "(UTC+06:00) Astana, Dhaka", offset: "UTC+06:00" },
  { value: "Asia/Bangkok", label: "(UTC+07:00) Bangkok, Hanoi, Jakarta", offset: "UTC+07:00" },
  {
    value: "Asia/Shanghai",
    label: "(UTC+08:00) Beijing, Hong Kong, Singapore",
    offset: "UTC+08:00"
  },
  { value: "Asia/Tokyo", label: "(UTC+09:00) Tokyo, Seoul, Osaka", offset: "UTC+09:00" },
  {
    value: "Australia/Sydney",
    label: "(UTC+10:00) Sydney, Melbourne, Brisbane",
    offset: "UTC+10:00"
  },
  {
    value: "Pacific/Noumea",
    label: "(UTC+11:00) Vladivostok, Solomon Islands",
    offset: "UTC+11:00"
  },
  {
    value: "Pacific/Auckland",
    label: "(UTC+12:00) Auckland, Wellington, Fiji",
    offset: "UTC+12:00"
  }
];

const defaultTz = computed(() => {
  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const found = timezones.find((tz) => tz.value === userTz);
  return found ? found.value : "America/New_York";
});

if (!timezone.value) {
  timezone.value = defaultTz.value;
}
</script>

<template>
  <USelect
    v-model="timezone!"
    value-key="value"
    value-label="label"
    :items="timezones"
    label="Timezone"
    icon="i-lucide-clock"
    class="w-full"
  />
</template>
