<template>
  <div class="app-content">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import "@/assets/css/reset.css";
</script>

<style lang="scss">
@import url("@/assets/css/main.scss");

.app-content {
  max-width: 1020px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
</style>
