import { createStore } from "vuex";
import axios from "axios";

import type { CurrentWeather } from "@/store/types/weatherType";
import type { CurrentWeatherList } from "@/store/types/weatherListType";

export default createStore({
  state: {
    isLoading: false,
    globalError: "",
    locationWeather: null,
    noticeError: null,
    searchResult: {},
  },
  getters: {
    getLoadingStatus(state) {
      return state.isLoading;
    },
    twWeather(state) {
      return state.locationWeather;
    },
    getNoticeError(state) {
      return state.noticeError;
    },
    getOrderResults(state) {
      return state.searchResult;
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
    SET_ERROR_NOTICE(state, notice) {
      state.noticeError = notice?.message || notice;
    },
    SET_SEARCH_RESULT(state, { site, data }) {
      if (!state.searchResult) {
        state.searchResult = {};
      }

      const context: Record<string, Array<CurrentWeather>> = state.searchResult;

      context[site] = data;
    },
  },
  actions: {
    async getTaiwanWeather({ commit }): Promise<CurrentWeather> {
      try {
        commit("SET_LOADING", true);

        const openWeatherKey = process.env.VUE_APP_WEATHER_API_KEY;

        const { data }: { data: CurrentWeather } = await axios.get(
          `/weather_api/data/2.5/weather?q=Taiwan&units=metric&appid=${openWeatherKey}`
        );

        commit("SET_TAIWAN_WEATHER", data);

        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async getSearchWeatherContent(_store, site): Promise<CurrentWeather> {
      try {
        if (!site) {
          throw new Error("The site is required.");
        }
        const openWeatherKey = process.env.VUE_APP_WEATHER_API_KEY;

        const { data }: { data: CurrentWeather } = await axios.get(
          `/weather_api/data/2.5/weather?q=${site}&units=metric&appid=${openWeatherKey}`
        );

        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getWeatherDetail({ commit }, site): Promise<CurrentWeatherList> {
      try {
        commit("SET_LOADING", true);
        const openWeatherKey = process.env.VUE_APP_WEATHER_API_KEY;

        if (!site) {
          throw new Error("The site is required.");
        }

        const { data } = await axios.get(
          `/weather_api/data/2.5/forecast?q=${site}&units=metric&appid=${openWeatherKey}`
        );

        commit("SET_SEARCH_RESULT", { site, data });

        return Promise.resolve(data);
      } catch (error) {
        commit("SET_GLOBAL_ERROR", error);

        return Promise.reject(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  modules: {},
});
