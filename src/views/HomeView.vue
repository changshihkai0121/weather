<template>
  <div class="home-page"></div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
// import fontAwesomeIcon from "vue-cli-plugin-fontawesome";

const store = useStore();

onBeforeMount(async () => {
  try {
    // const data = await store.dispatch("searchWeather", "Taiwan");
    // console.log(data);
  } catch (error) {
    console.log("error", error);
    store.commit("SET_GLOBAL_ERROR", false);
  }
});
</script>

<style lang="scss">
.home-page {
}
</style>
