<template>
  <div class="app-content">
    <div v-if="isLoading" class="default-skeleton">
      <weather-location :is-skeleton="isLoading" />
      <weather-status :is-skeleton="isLoading" />
      <weather-temperature :is-skeleton="isLoading" />
    </div>
    <router-view v-else />
  </div>
</template>

<script lang="ts" setup>
import "@/assets/css/reset.css";
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";

import type { Ref } from "vue";
import WeatherLocation from "./components/WeatherLocation.vue";
import WeatherTemperature from "./components/WeatherTemperature.vue";
import WeatherStatus from "./components/WeatherStatus.vue";

const store = useStore();

const isLoading: Ref<boolean> = ref(true);

onBeforeMount(async () => {
  try {
    await store.dispatch("getTaiwanWeather");
  } catch (error) {
    console.log(error);
  } finally {
    // isLoading.value = false;
  }
});
</script>

<style lang="scss">
@import url("@/assets/css/main.scss");

.app-content {
  max-width: 1020px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.default-skeleton {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
