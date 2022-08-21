<template>
  <transition mode="out-in">
    <div v-if="loading" class="default-skeleton">
      <SkeletonContent width="250" height="40" distance="0 0 16px" />
      <SkeletonContent width="250" height="24" distance="0 0 40px" />
      <SkeletonContent width="200" height="200" />
      <SkeletonContent
        width="30"
        height="30"
        distance="0"
        class="default-skeleton__search"
      />
    </div>
    <div v-else class="home-page">
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        class="home-page__search-location"
        @click="changeToSearch"
      />
      <WeatherSearchPopup v-model:visible="isVisibleSearchPopup" />
      <WeatherIcon :status="weatherDescription" />
      <WeatherLocation :location="countryName" />
      <WeatherStatus :status="weatherDescription" />
      <WeatherTemperature :main="weatherTempMain" />
      <div class="home-page__read-more">
        <div class="home-page__read-btn" @click="changeToDetail">Read More</div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import type { Ref } from "vue";

import WeatherLocation from "@/components/WeatherLocation.vue";
import WeatherStatus from "@/components/WeatherStatus.vue";
import WeatherTemperature from "@/components/WeatherTemperature.vue";
import WeatherIcon from "@/components/WeatherIcon.vue";
import WeatherSearchPopup from "@/components/WeatherSearchPopup.vue";
import SkeletonContent from "@/components/SkeletonContent.vue";

const store = useStore();
const router = useRouter();
const isVisibleSearchPopup: Ref<boolean> = ref(false);
const loading = computed(() => store.getters["getLoadingStatus"]);
const twWeather = computed(() => store.getters["twWeather"]);
const countryName = computed(() => twWeather.value?.name || "Taiwan");
const weatherDescription = computed(() => {
  if (twWeather.value?.weather && twWeather.value.weather.length) {
    return twWeather.value.weather;
  }
  return "NA";
});
const weatherTempMain = computed(() => {
  if (!twWeather.value?.main) {
    return null;
  }

  return twWeather.value.main;
});

const changeToSearch = (): void => {
  isVisibleSearchPopup.value = true;
};
const changeToDetail = (): void => {
  router.push({
    name: "detail",
    params: {
      area: "taiwan",
    },
  });
};

onBeforeMount(async () => {
  try {
    await store.dispatch("getTaiwanWeather");
  } catch (error) {
    store.commit("SET_ERROR_NOTICE", error);
  }
});
</script>

<style lang="scss">
.home-page {
  &__read-more {
    font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__read-btn {
    cursor: pointer;
    max-width: 120px;
    border: 1px solid hsl(210, 15%, 95%);
    padding: 12px 24px;
    margin-right: 20px;
    margin-top: 20px;
    border-radius: 6px;
    transition: all 0.3s ease-in-out;

    &:hover,
    &:active,
    &:focus,
    &:focus-visible,
    &:focus-within {
      background-color: #fff;
      color: #2b5876;
    }
  }

  &__search-location {
    position: absolute;
    top: 30px;
    right: 30px;
    color: #fff;
    cursor: pointer;
  }
}

.default-skeleton {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__search {
    position: absolute;
    top: 30px;
    right: 30px;
  }
}
</style>
