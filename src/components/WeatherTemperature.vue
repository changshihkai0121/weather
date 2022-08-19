<template>
  <div class="weather-temperature">
    <p class="weather-temperature__number">
      {{ temperature }}
    </p>
    <font-awesome-icon icon="fa-solid fa-circle-dot" />
  </div>
</template>

<script lang="ts">
export default {
  name: "WeatherTemperature",
  props: {
    temperature: {
      type: [String, Number],
      default: 0,
    },
  },
};
</script>

<style lang="scss">
.weather-temperature {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  color: #fff;
  .fa-circle-dot {
    font-size: 24px;
  }
  &__number {
    font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
    font-size: 100px;
  }
}
</style>
