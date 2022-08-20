<template>
  <div class="weather-location">
    <p class="weather-location__name">
      {{ location }}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: "WeatherLocation",
  props: {
    location: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.weather-location {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #fff;
  font-family: "Roboto", sans-serif;
}
</style>
