<template>
  <div class="weather-status">
    <div v-if="isSkeleton" class="weather-location__skeleton" />
    <p v-else>{{ location }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "WeatherStatus",
  props: {
    isSkeleton: {
      type: Boolean,
      default: false,
    },
    status: {
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
  width: 100%;
  &__skeleton {
    width: 50%;
    background-color: #ccc;
    height: 24px;
    position: relative;
  }
}
</style>
