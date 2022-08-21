<template>
  <div
    v-if="props.context && props.currentContext"
    class="weather-detail-context"
  >
    <div class="weather-detail-context__name">
      <font-awesome-icon icon="fa-solid fa-location-dot" />
      <span>{{ props.context.city.name }}</span>
    </div>
    <div class="weather-detail-context__temp">
      <WeatherTemperature :main="weatherTempMain" />
      <WeatherIcon :status="weatherDescription" />
    </div>
    <WeatherStatus :status="weatherDescription" />
    <p class="weather-detail-context__update-at">
      Updated:
      {{ moment(props.currentContext.dt * 1000).format("YYYY/MM/DD HH:mm:ss") }}
    </p>
    <p class="weather-detail-context__label">Min Temperature:</p>
    <div class="weather-detail-context__min-line">
      <ul class="weather-detail-context__table">
        <li>
          <p>{{ minAvgTemp().maxTemp }}</p>
        </li>
        <li>
          <p>{{ Math.round(minAvgTemp().maxTemp * (3 / 4)) }}</p>
        </li>
        <li>
          <p>{{ Math.round(minAvgTemp().maxTemp * (2 / 4)) }}</p>
        </li>
        <li>
          <p>{{ Math.round(minAvgTemp().maxTemp * (1 / 4)) }}</p>
        </li>
        <li>
          <p>0</p>
        </li>
      </ul>
      <div
        v-for="(temp, tempIndex) in minTempList"
        :key="tempIndex"
        class="weather-detail-context__line"
      >
        <i
          v-for="(tempContext, tempContextIndex) in temp"
          :key="tempContextIndex"
          :style="`height: ${(tempContext / minAvgTemp().maxTemp) * 160}px;`"
        >
          <span>{{ tempContext }}</span>
        </i>
        <p>{{ tempIndex }}</p>
      </div>
    </div>
    <p class="weather-detail-context__label">Max Temperature:</p>
    <div class="weather-detail-context__min-line">
      <ul class="weather-detail-context__table">
        <li>
          <p>{{ maxAvgTemp().maxTemp }}</p>
        </li>
        <li>
          <p>{{ Math.round(maxAvgTemp().maxTemp * (3 / 4)) }}</p>
        </li>
        <li>
          <p>{{ Math.round(maxAvgTemp().maxTemp * (2 / 4)) }}</p>
        </li>
        <li>
          <p>{{ Math.round(maxAvgTemp().maxTemp * (1 / 4)) }}</p>
        </li>
        <li>
          <p>0</p>
        </li>
      </ul>
      <div
        v-for="(temp, tempIndex) in maxTempList"
        :key="tempIndex"
        class="weather-detail-context__line"
      >
        <i
          v-for="(tempContext, tempContextIndex) in temp"
          :key="tempContextIndex"
          :style="`height: ${(tempContext / maxAvgTemp().maxTemp) * 160}px;`"
        >
          <span>{{ tempContext }}</span>
        </i>
        <p>{{ tempIndex }}</p>
      </div>
    </div>
    <p class="weather-detail-context__label">Humidity:</p>
    <div
      v-for="(humidity, humidityDate) in humidityValue"
      :key="humidityDate"
      class="weather-detail-context__circle-content"
    >
      <p class="weather-detail-context__circle-date">{{ humidityDate }}</p>
      <div
        v-for="(humidityValue, humidityIndex) in humidity"
        :key="humidityIndex"
        class="weather-detail-context__humidity-circle"
      >
        <figcaption
          :style="`--bg: radial-gradient(
        circle closest-side,
        white 0,
        white 58.74%,
        transparent 58.74%,
        transparent 66%,
        white 0
      ),
      conic-gradient(#4e79a7 0, #4e79a7 ${humidityValue}%, #edc949 0, #edc949 100%);`"
        >
          <div class="weather-detail-context__humidity-notice">
            humidity {{ `${humidityValue}%` }}<span style="color: #4e79a7" />
            <br />
            Total<span style="color: #edc949"></span>
          </div>
        </figcaption>
      </div>
    </div>
  </div>
  <div v-else>Not Any Detail Content.</div>
  <div class="weather-detail-context__tool">
    <div class="weather-detail-context__back-to-home" @click="backToHome">
      Back to Home page.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import type { CurrentWeatherList } from "@/store/types/weatherListType";
import type { CurrentWeather } from "@/store/types/weatherType";

import WeatherIcon from "@/components/WeatherIcon.vue";
import WeatherTemperature from "@/components/WeatherTemperature.vue";
import WeatherStatus from "@/components/WeatherStatus.vue";

interface Props {
  context?: CurrentWeatherList;
  currentContext?: CurrentWeather;
}

const store = useStore();
const router = useRouter();
const props = defineProps<Props>();
const weatherDescription = computed(() => {
  return props.currentContext?.weather;
});
const weatherTempMain = computed(() => {
  return props.currentContext?.main;
});
const maxTempList = computed(() => {
  if (props.context) {
    let output: Record<string, Array<number>> = {};
    for (const contextValue of props.context.list) {
      const date = moment(contextValue.dt_txt).format("YYYY-MM-DD");
      if (!Object.hasOwnProperty.call(output, date)) {
        output[date] = [];
      }

      output[date].push(contextValue.main.temp_max);
    }

    return output;
  }

  return [];
});
const minTempList = computed(() => {
  if (props.context) {
    let output: Record<string, Array<number>> = {};
    for (const contextValue of props.context.list) {
      const date = moment(contextValue.dt_txt).format("YYYY-MM-DD");
      if (!Object.hasOwnProperty.call(output, date)) {
        output[date] = [];
      }

      output[date].push(contextValue.main.temp_min);
    }

    return output;
  }

  return [];
});

const minAvgTemp = () => {
  let minLength = 0;
  let maxTemp = 0;
  const total = Object.values(minTempList.value).reduce((result, value) => {
    if (value && value.length) {
      minLength = minLength + value.length;
      result += value.reduce((a: number, b: number) => {
        if (b > maxTemp) {
          maxTemp = b;
        }
        return a + b;
      }, 0);
    }

    return result;
  }, 0);

  maxTemp = maxTemp + 20;

  return {
    total,
    maxTemp,
    minLength,
    avg: total / minLength,
  };
};

const maxAvgTemp = () => {
  let maxLength = 0;
  let maxTemp = 0;
  const total = Object.values(maxTempList.value).reduce((result, value) => {
    if (value && value.length) {
      maxLength = maxLength + value.length;
      result += value.reduce((a: number, b: number) => {
        if (b > maxTemp) {
          maxTemp = b;
        }
        return a + b;
      }, 0);
    }

    return result;
  }, 0);

  maxTemp = maxTemp + 20;

  return {
    total,
    maxLength,
    maxTemp,
    avg: total / maxLength,
  };
};

const humidityValue = computed(() => {
  if (props.context) {
    let output: Record<string, Array<number>> = {};
    for (const contextValue of props.context.list) {
      const date = moment(contextValue.dt_txt).format("YYYY-MM-DD");
      if (!Object.hasOwnProperty.call(output, date)) {
        output[date] = [];
      }

      output[date].push(contextValue.main.humidity);
    }

    return output;
  }

  return [];
});

const backToHome = () => {
  router.push({ name: "home" });
};
</script>

<style lang="scss">
.weather-detail-context {
  display: block;
  padding: 40px 0;
  &__name {
    font-size: 14px;
    color: #fff;
    span {
      margin-left: 10px;
    }
  }
  &__update-at {
    font-size: 12px;
    color: #c4c4c4;
    margin: 12px 0;
  }
  &__temp {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    .weather-temperature {
      display: flex;
      width: auto;
      margin-top: 0;
    }
    .weather-icon {
      margin-bottom: 0;
      margin-left: 20px;
      font-size: 80px;
    }
  }

  &__table {
    width: calc(100% - 90px);
    padding: 0 45px;
    position: absolute;
    li {
      position: relative;
      width: 100%;
      height: 1px;
      margin-bottom: 40px;
      background-color: #c2c2c2;
      &:last-child {
        margin-bottom: 0;
      }
      p {
        position: absolute;
        left: -40px;
        top: -5px;
        display: inline-block;
        color: #fff;
        font-size: 12px;
      }
    }
    @media (max-width: 400px) {
      width: calc(100% - 60px);
      padding: 0 20px 0 40px;
    }
  }

  &__min-line {
    position: relative;
    height: 165px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 40px;
    @media (max-width: 1024px) {
      margin-left: 20px;
    }
  }

  &__line {
    display: inline-block;
    margin-right: 10px;
    font-size: 0;
    z-index: 1;
    position: relative;
    p {
      color: #fff;
      font-size: 12px;
      transform: scale(0.825);
      position: absolute;
      display: block;
      width: 100%;
    }
    i {
      width: 15px;
      display: inline-block;
      background-color: #fff;
      margin-right: 2px;
      transition: all 0.2s ease-in-out;
      position: relative;
      @media (max-width: 1024px) {
        width: 5px;
      }
      @media (max-width: 400px) {
        width: 2px;
      }
      span {
        position: absolute;
        font-size: 12px;
        top: -12px;
        left: 0;
        color: #fff;
        opacity: 0;
        transition: all 0.2s ease-in-out;
      }
      &:hover,
      &:active,
      &:focus,
      &:focus-visible,
      &:focus-within {
        opacity: 0.7;
        span {
          opacity: 1;
        }
      }
    }
  }

  &__label {
    color: #fff;
    font-size: 14px;
    line-height: 18px;
    text-align: left;
    margin-bottom: 30px;
    @media (max-width: 1024px) {
      padding: 0 20px;
      text-align: center;
      margin-bottom: 15px;
    }
  }

  &__circle {
    width: 300px;
    height: 300px;
    display: block;
    margin: 0 auto;
    border-radius: 300px;
    background-color: #fff;
  }

  &__circle-content {
    position: relative;
  }
  &__circle-date {
    color: #fff;
    text-align: left;
    margin-bottom: 20px;
  }
  &__humidity-circle {
    display: inline-block;
    width: calc(50% - 40px);
    margin-left: 20px;
    margin-bottom: 20px;
    span:after {
      display: inline-block;
      content: "";
      width: 0.8em;
      height: 0.8em;
      margin-left: 0.4em;
      height: 0.8em;
      border-radius: 0.2em;
      background: currentColor;
    }
    &:nth-child(2n) {
      margin-left: 0;
      margin-right: 20px;
    }
    figcaption {
      position: relative;
      width: 100%;
      min-height: 350px;
      margin: 0;
      outline: 1px solid #ccc;
      background: var(--bg);
    }
  }
  &__humidity-notice {
    position: absolute;
    text-align: right;
    bottom: 0;
    right: 0;
    padding: 10px 20px;
  }
  &__back-to-home {
    font-size: 12px;
    color: #fff;
    border-radius: 5px;
    border: 1px solid #fff;
    margin: 0 auto;
    padding: 8px 20px;
    margin-bottom: 40px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover,
    &:active,
    &:focus,
    &:focus-visible,
    &:focus-within {
      background-color: #fff;
      color: #000;
    }
  }
  &__tool {
    display: flex;
    align-content: center;
    justify-content: center;
  }
}
</style>
