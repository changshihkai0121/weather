import { createStore } from "vuex";
import axios from "axios";

import type { CurrentWeather } from "@/store/types/weatherType";

export default createStore({
  state: {
    globalError: "",
    locationWeather: null,
  },
  getters: {},
  mutations: {
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
        // const openWeatherKey = process.env.VUE_APP_WEATHER_API_KEY;

        const { data } = await axios.get(
          `/mock_api/v3/f47be871-ccc7-49e6-908f-c6058204d07e`
          // `/weather_api/data/2.5/weather?q=Taiwan&appid=${openWeatherKey}`
        );

        commit("SET_TAIWAN_WEATHER", data);

        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async searchWeather({ commit }, country) {
      try {
        const openWeatherKey = process.env.VUE_APP_WEATHER_API_KEY;

        if (!country) {
          throw new Error("The country is required.");
        }

        const { data } = await axios.get(
          `/weather_api/data/2.5/forecast?q=${country}&appid=${openWeatherKey}`
        );

        return Promise.resolve(data);
      } catch (error) {
        commit("SET_GLOBAL_ERROR", false);

        return Promise.reject(error);
      }
    },
  },
  modules: {},
});
