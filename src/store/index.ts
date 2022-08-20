import { createStore } from "vuex";
import axios from "axios";

import type { CurrentWeather } from "@/store/types/weatherType";

export default createStore({
  state: {
    isLoading: false,
    globalError: "",
    locationWeather: null,
  },
  getters: {
    getLoadingStatus(state) {
      return state.isLoading;
    },
    twWeather(state) {
      return state.locationWeather;
    },
  },
  mutations: {
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_GLOBAL_ERROR(state, status) {
      state.globalError = status;
    },
    SET_TAIWAN_WEATHER(state, weather) {
      state.locationWeather = weather;
    },
  },
  actions: {
    async getTaiwanWeather({ commit }): Promise<CurrentWeather> {
      try {
        commit("SET_LOADING", true);

        // const openWeatherKey = process.env.VUE_APP_WEATHER_API_KEY;

        const { data }: { data: CurrentWeather } = await axios.get(
          `/mock_api/v3/4f4ad2ae-5ab1-400a-a913-018b69ffd248`
          // `/weather_api/data/2.5/weather?q=Taiwan&units=metric&appid=${openWeatherKey}`
        );

        commit("SET_TAIWAN_WEATHER", data);

        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async getSearchWeatherContent({ commit }, site): Promise<CurrentWeather> {
      try {
        if (!site) {
          throw new Error("The site is required.");
        }

        commit("SET_LOADING", true);
        // const openWeatherKey = process.env.VUE_APP_WEATHER_API_KEY;

        const { data }: { data: CurrentWeather } = await axios.get(
          `/v3/933253d7-79b2-4bda-8432-b64065366c3d`
          // `/weather_api/data/2.5/weather?q=Taiwan&units=metric&appid=${openWeatherKey}`
        );

        commit("SET_TAIWAN_WEATHER", data);

        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async getWeatherDetail({ commit }, site) {
      try {
        commit("SET_LOADING", true);
        // const openWeatherKey = process.env.VUE_APP_WEATHER_API_KEY;

        if (!site) {
          throw new Error("The site is required.");
        }

        const { data } = await axios.get(
          `/mock_api/v3/b77136fc-ed9f-410c-9b37-3ec0363f4629`
          // `/weather_api/data/2.5/forecast?q=${site}&units=metric&appid=${openWeatherKey}`
        );

        return Promise.resolve(data);
      } catch (error) {
        commit("SET_GLOBAL_ERROR", false);

        return Promise.reject(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  modules: {},
});
