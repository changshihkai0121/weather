import { createStore } from "vuex";
// import axios from "axios";

export default createStore({
  state: {
    globalError: "",
  },
  getters: {},
  mutations: {
    SET_GLOBAL_ERROR(state, status) {
      state.globalError = status;
    },
  },
  actions: {
    async searchWeather({ commit }) {
      try {
        // await console.log(
        // );
        // await axios.get()
      } catch (error) {
        commit("SET_GLOBAL_ERROR", false);
      }
    },
  },
  modules: {},
});
