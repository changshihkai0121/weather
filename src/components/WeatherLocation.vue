<template>
  <div class="weather-location">
    <div v-if="isSkeleton" class="weather-location__skeleton" />
    <p v-else>{{ location }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "WeatherLocation",
  props: {
    isSkeleton: {
      type: Boolean,
      default: false,
    },
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
  color: #fff;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 12px;
  width: 100%;
  &__skeleton {
    width: 50%;
    background-color: #ccc;
    height: 40px;
    position: relative;
  }
}
</style>
