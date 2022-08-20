<template>
  <div
    v-for="context in weatherIds"
    :key="`weather-icon-${context.weatherId}`"
    class="weather-icon"
  >
    <font-awesome-icon
      v-if="context.weatherId === '11'"
      icon="fa-solid fa-cloud-bolt"
    />
    <font-awesome-icon
      v-if="context.weatherId === '09'"
      icon="fa-solid fa-cloud-rain"
    />
    <font-awesome-icon
      v-if="context.weatherId === '10'"
      icon="fa-solid fa-cloud-showers-heavy"
    />
    <font-awesome-icon
      v-if="context.id === 511 && context.weatherId === '13'"
      icon="fa-solid fa-cloud-showers-water"
    />
    <font-awesome-icon
      v-if="context.weatherId === '13' && context.id !== 511"
      icon="fa-solid fa-snowflake"
    />
    <font-awesome-icon
      v-if="context.weatherId === '50' && context.id !== 781"
      icon="fa-solid fa-smog"
    />
    <font-awesome-icon
      v-if="context.weatherId === '50' && context.id === 781"
      icon="fa-solid fa-tornado"
    />
    <font-awesome-icon
      v-if="context.weatherId === '01'"
      icon="fa-solid fa-sun"
    />
    <font-awesome-icon
      v-if="context.weatherId === '02'"
      icon="fa-solid fa-cloud-sun"
    />
    <font-awesome-icon
      v-if="context.weatherId === '03'"
      icon="fa-solid fa-cloud"
    />
    <font-awesome-icon
      v-if="context.weatherId === '04' && !isNight"
      icon="fa-solid fa-cloud-sun"
    />
    <font-awesome-icon
      v-if="context.weatherId === '04' && isNight"
      icon="fa-solid fa-cloud-moon"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from "vue";
import { WeatherIcon } from "@/plugins/weatherIconMappingList";

import type { Weather } from "@/store/types/weatherType";
import { Ref } from "vue";

interface Props {
  status?: Weather | Array<Weather>;
}

interface IconInterface {
  id: number;
  weatherId: string;
}

const props = defineProps<Props>();
const nowHr: Ref<number> = ref(new Date().getHours());
const isNight: Ref<boolean> = ref(nowHr.value > 18);
const weatherIds = computed((): Array<IconInterface> => {
  if (!props?.status) {
    return [];
  }

  if (Array.isArray(props.status)) {
    return props.status.map(({ id }) => ({
      id,
      weatherId: WeatherIcon[id],
    }));
  }

  return [
    {
      id: props.status.id,
      weatherId: WeatherIcon[props.status.id],
    },
  ];
});
</script>

<style lang="scss">
.weather-icon {
  color: #fff;
  font-size: 105px;
  margin-bottom: 40px;
}
</style>
