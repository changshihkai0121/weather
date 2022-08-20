<template>
  <div class="weather-temperature">
    <transition>
      <p
        v-if="!shownRange"
        class="weather-temperature__number"
        @click="shownRange = true"
      >
        {{ temperature }}
      </p>
      <p v-else @click="shownRange = false" class="weather-temperature__number">
        {{ temperatureRange }}
      </p>
    </transition>
    <font-awesome-icon icon="fa-solid fa-circle-dot" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref } from "vue";

import type { Ref } from "vue";
import type { Main } from "@/store/types/weatherType";

interface Props {
  main?: Main;
}

const shownRange: Ref<boolean> = ref(false);
const props = defineProps<Props>();
const temperature = computed((): number => {
  if (!props?.main || !props?.main?.temp) {
    return 0;
  }

  return Math.round(props.main.temp);
});
const temperatureRange = computed((): string => {
  if (!props?.main || !props?.main?.temp_min || !props?.main?.temp_max) {
    return "NA";
  }

  return `${Math.round(props.main.temp_min)}~${Math.round(
    props.main.temp_max
  )}`;
});
</script>

<style lang="scss">
.weather-temperature {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  color: #fff;
  margin-top: 40px;
  .fa-circle-dot {
    font-size: 24px;
  }
  &__number {
    font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
    font-size: 100px;
    cursor: pointer;
  }
}
</style>
