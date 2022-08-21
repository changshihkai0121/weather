<template>
  <transition>
    <div v-if="props.visible" class="weather-search-popup">
      <i class="weather-search-popup__shadow" @click="shadowClick" />
      <div class="weather-search-popup__search">
        <form action="#" class="weather-search-popup__form">
          <label
            for="location"
            class="weather-search-popup__form-label"
            :class="{
              'weather-search-popup__form-label--disabled': searchLoading,
            }"
          >
            <div class="weather-search-popup__search-context">
              <div
                v-if="searchLoading"
                class="weather-search-popup__loading loading-animated"
              >
                <font-awesome-icon icon="fa-solid fa-spinner" />
              </div>
              <div class="weather-search-popup__icon">
                <font-awesome-icon icon="fa-solid fa-location-crosshairs" />
                <p class="weather-search-popup__input-length">
                  Most content remaining {{ (searchContext.length - 60) * -1 }}.
                </p>
              </div>
              <input
                type="text"
                v-model="searchContext"
                spellcheck="true"
                placeholder="Search order country weather."
                maxlength="60"
                :disabled="searchLoading"
                required
              />
            </div>
          </label>
          <div
            class="weather-search-popup__submit-btn"
            :class="{
              'weather-search-popup__submit-btn--disabled': searchLoading,
            }"
            @click="searchContent"
          >
            <div v-if="searchLoading" class="loading-animated">
              <font-awesome-icon icon="fa-solid fa-spinner" />
            </div>
            Search
          </div>
        </form>
        <div
          class="weather-search-popup__items"
          :class="{
            'weather-search-popup__items--loading': searchLoading,
          }"
        >
          <i
            v-if="searchLoading"
            class="weather-search-popup__loading-shadow"
          />
          <div
            v-if="searchLoading"
            class="loading-animated weather-search-popup__loading-icon"
          >
            <font-awesome-icon icon="fa-solid fa-spinner" />
          </div>
          <div v-if="!searchResult" class="weather-search-popup__empty">
            <font-awesome-icon icon="fa-solid fa-map-location-dot" />
            <p>The location is Empty.</p>
          </div>
          <div
            v-else-if="searchResult.cod !== 200"
            class="weather-search-popup__empty"
          >
            <font-awesome-icon icon="fa-solid fa-map-location-dot" />
            <p>{{ searchResult.message }}</p>
          </div>
          <div v-else class="weather-search-popup__result" @click="readMore">
            <div class="weather-search-popup__result-desc">
              <WeatherLocation :location="searchResult.name" />
              <WeatherIcon :status="weatherContent(searchResult)" />
              <p>{{ temperatureRange() }}</p>
            </div>
            <p>Read More</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import type { Ref } from "vue";
import type { CurrentWeather, Weather } from "@/store/types/weatherType";

import WeatherIcon from "@/components/WeatherIcon.vue";
import WeatherLocation from "@/components/WeatherLocation.vue";

interface Props {
  visible: boolean;
}

const store = useStore();
const searchContext: Ref<string> = ref("");
const searchLoading: Ref<boolean> = ref(false);
const searchResult: Ref<CurrentWeather | null> = ref(null);
const emit = defineEmits<{
  (e: "update:visible", status: boolean): void;
}>();
const router = useRouter();
const props = defineProps<Props>();
const shadowClick = (): void => {
  if (searchLoading.value) {
    return;
  }

  searchContext.value = "";
  searchResult.value = null;
  emit("update:visible", false);
};

const temperatureRange = (): string => {
  if (
    !searchResult.value?.main ||
    !searchResult.value?.main?.temp_min ||
    !searchResult.value?.main?.temp_max
  ) {
    return "NA";
  }

  return `${Math.round(searchResult.value.main.temp_min)}~${Math.round(
    searchResult.value.main.temp_max
  )}`;
};

const weatherContent = (context: CurrentWeather): Weather | Array<Weather> => {
  if (context?.weather && context.weather.length) {
    return context.weather;
  }

  return {
    id: 0,
    main: "",
    description: "",
    icon: "",
  };
};

const searchContent = async (): Promise<void> => {
  try {
    if (!searchContext.value || !searchContext.value.trim()) {
      store.commit("SET_ERROR_NOTICE", "Please check content is not empty.");
      return;
    }
    searchLoading.value = true;

    const data = await store.dispatch(
      "getSearchWeatherContent",
      searchContext.value
    );

    searchResult.value = data;
  } catch (error: unknown) {
    store.commit("SET_ERROR_NOTICE", error);
  } finally {
    searchLoading.value = false;
  }
};

const readMore = (): void => {
  if (!searchResult.value?.name) {
    store.commit("SET_ERROR_NOTICE", "The country name is validate.");

    return;
  }
  router.push({
    name: "detail",
    params: {
      area: searchResult.value?.name,
    },
  });
};
</script>

<style lang="scss">
.weather-search-popup {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &__loading {
    width: 24px;
    height: 24px;
    font-size: 24px;
    position: absolute;
    top: 16.5px;
    left: 50%;
    color: #2b5876;
  }

  .loading-animated {
    @keyframes loading {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    animation: loading;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    display: inline-block;
  }

  &__loading-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  &__loading-shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    left: 0;
    right: 0;
    border-radius: 5px;
  }

  &__items {
    display: block;
    position: relative;
    margin-top: 60px;
  }

  &__empty {
    color: #fff;
    font-size: 100px;
    border: 2px solid #fff;
    border-radius: 5px;
    padding: 80px 20px;
    background: #2b5876; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to top,
      #2b5876,
      #4e4376
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to top,
      #2b5876,
      #4e4376
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    p {
      font-size: 12px;
      line-height: 16px;
      margin-top: 16px;
    }
  }

  &__result {
    background: #2b5876; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to top,
      #2b5876,
      #4e4376
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to top,
      #2b5876,
      #4e4376
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 5px;
    border: 1px solid #fff;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    &:hover,
    &:active,
    &:focus,
    &:focus-visible,
    &:focus-within {
      opacity: 0.7;
    }

    .weather-icon {
      margin-bottom: 0;
      font-size: 20px;
      padding-left: 20px;
      padding-right: 20px;
    }
    .weather-location {
      font-size: 20px;
    }
    p {
      color: #fff;
    }
  }

  &__result-desc {
    display: flex;
    align-items: center;
  }

  &__search {
    z-index: 1;
    position: relative;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    @media (max-width: 1024px) {
      padding: 0 20px;
    }
  }

  &__shadow {
    background-color: rgba(0, 0, 0, 0.8);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;

    &:hover,
    &:active,
    &:focus,
    &:focus-visible,
    &:focus-within {
      background-color: rgba(0, 0, 0, 0.78);
    }
  }

  &__input-length {
    position: absolute;
    top: 55px;
    font-size: 12px;
    width: 300px;
    text-align: left;
    color: #c4c4c4;
  }

  &__icon {
    color: #c4c4c4;
    font-size: 24px;
    position: absolute;
    left: 13px;
    pointer-events: none;
    top: 17px;
    &::after {
      display: inline-block;
      content: "";
      height: 24px;
      width: 2px;
      background-color: #c4c4c4;
      position: absolute;
      margin-left: 13px;
    }
  }

  &__search-context {
    position: relative;
    width: 100%;
    display: inherit;
  }

  &__submit-btn {
    border: 1px solid #fff;
    background-color: transparent;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    padding: 15px 20px;
    margin-left: 20px;
    transition: all 0.2s ease-in-out;
    width: 20%;
    min-width: 150px;
    &:hover,
    &:active,
    &:focus,
    &:focus-visible,
    &:focus-within {
      background-color: #fff;
      color: #000;
    }
    &--disabled {
      cursor: not-allowed;
      background-color: #fff;
      color: #000;
      opacity: 0.7;
    }
  }

  &__form-label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 80%;

    input {
      height: 100%;
      width: 100%;
      outline: none;
      padding: 15px 50px 15px 62px;
      font-size: 20px;
      caret-color: #c4c4c4;
      border: 2px solid #ddd;
      border-radius: 5px;
      transition: all 0.1s ease-in-out;
      background: #2b5876;
      /* fallback for old browsers */
      background: -webkit-linear-gradient(to left, #4e4376, #2b5876);
      /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to left, #4e4376, #2b5876);
      /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      color: #fff;

      &:valid ~ .weather-search-popup__icon {
        color: #c4c4c4;
      }

      &::selection {
        color: #fff;
        background: #c4c4c4;
      }

      &:focus,
      &:valid {
        border-color: #c4c4c4;
      }

      &::placeholder {
        color: #c4c4c4;
      }

      &:valid ~ .counter {
        color: #c4c4c4;
        border-color: #c4c4c4;
      }
    }

    &--disabled {
      cursor: not-allowed;
      input {
        background: #fff;
        cursor: not-allowed;
      }
    }
  }

  &__form {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
}
</style>
