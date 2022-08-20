<template>
  <i
    class="skeleton-content skeleton-animated"
    :style="`width: ${width}px; height: ${height}px; margin: ${distance}`"
  />
</template>

<script lang="ts">
export default {
  name: "SkeletonContent",
  props: {
    height: {
      type: [Number, String],
      default: 24,
    },
    width: {
      type: [Number, String],
      default: 200,
    },
    distance: {
      type: [Number, String],
      default: "24px",
    },
  },
};
</script>

<style lang="scss">
@keyframes loader {
  from {
    background-position: -100% 0;
  }
  to {
    background-position: 100% 0;
  }
}

.skeleton-content {
  max-width: 100%;
  display: block;
}

.skeleton-animated {
  background: linear-gradient(
    90deg,
    hsl(210, 15%, 80%),
    hsl(210, 15%, 95%),
    hsl(210, 15%, 80%)
  );
  background-size: 200%;
  animation: loader 3s infinite reverse;
}
</style>
