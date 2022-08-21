<template>
  <transition mode="out-in">
    <div v-if="loading" class="detail-skeleton">
      <SkeletonContent width="300" height="40" distance="0 auto 40px" />
      <SkeletonContent width="400" height="200" distance="0 auto 40px" />
      <SkeletonContent width="300" height="40" distance="0 auto 40px" />
      <div class="detail-skeleton__half">
        <SkeletonContent width="400" height="200" distance="0 25px 40px" />
        <SkeletonContent width="400" height="200" distance="0 0 40px" />
      </div>
      <div class="detail-skeleton__half">
        <SkeletonContent width="400" height="200" distance="0 25px 40px" />
        <div>
          <SkeletonContent width="180" height="20" distance="0 0 10px" />
          <SkeletonContent width="150" height="20" distance="0 0 10px" />
          <SkeletonContent width="200" height="20" distance="0 0 10px" />
          <SkeletonContent width="150" height="20" distance="0 0 10px" />
        </div>
      </div>
      <div class="detail-skeleton__half">
        <SkeletonContent width="400" height="200" distance="0 25px 40px" />
        <SkeletonContent width="400" height="200" distance="0 0 40px" />
      </div>
      <SkeletonContent width="400" height="20" distance="0 auto 20px" />
      <SkeletonContent width="400" height="20" distance="0 auto 20px" />
      <SkeletonContent width="400" height="20" distance="0 auto 20px" />
    </div>
    <div v-else-if="detailContext && currentWeather" class="detail-view">
      <div v-if="detailContext.cod === '200'">
        <WeatherDetailContent
          :context="detailContext"
          :current-context="currentWeather"
        />
      </div>
      <div v-else>
        {{ detailContext.message }}
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import WeatherDetailContent from "@/components/WeatherDetailContent.vue";
import SkeletonContent from "@/components/SkeletonContent.vue";

import type { Ref } from "vue";
import type { CurrentWeather } from "@/store/types/weatherType";
import type { CurrentWeatherList } from "@/store/types/weatherListType";

const store = useStore();
const route = useRoute();
const router = useRouter();
const loading = computed(() => store.getters["getLoadingStatus"]);
const area = computed(() => route.params.area);
const detailResult = computed(() => store.getters["getOrderResults"]);
const currentWeather: Ref<CurrentWeather | null> = ref(null);

const detailContext = computed(() => {
  const getAreaValue: CurrentWeatherList =
    detailResult.value[area.value as string];

  if (getAreaValue) {
    return getAreaValue;
  }

  return null;
});

onBeforeMount(async () => {
  try {
    if (!area.value) {
      router.push({
        name: "home",
      });
    }

    if (!detailContext.value) {
      await store.dispatch("getWeatherDetail", area.value);
    }
    currentWeather.value = await store.dispatch(
      "getSearchWeatherContent",
      area.value
    );
  } catch (error) {
    store.commit("SET_ERROR_NOTICE", error);
  } finally {
    store.commit("SET_LOADING", false);
  }
});
</script>

<style lang="scss">
.detail-skeleton {
  display: block;
  padding: 40px 0;
  box-sizing: border-box;
  height: 100%;
  &__half {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.detail-view {
  padding: 40px 0;
  height: 100%;
  display: block;
}
</style>
