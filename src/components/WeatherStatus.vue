<template>
  <p class="weather-status">{{ statusDescription }}</p>
</template>

<script lang="ts" setup>
import type { Weather } from "@/store/types/weatherType";
import { defineProps, computed } from "vue";

interface Props {
  status?: Weather | Array<Weather>;
}

const props = defineProps<Props>();
const statusDescription = computed((): string => {
  if (!props?.status) {
    return "NA";
  }

  if (Array.isArray(props.status)) {
    return props.status.map(({ description }) => description).join(",");
  }

  return props.status?.description || "NA";
});
</script>

<style lang="scss">
.weather-status {
  color: #fff;
  position: relative;
  text-transform: capitalize;
  margin-top: 20px;
  font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
}
</style>
