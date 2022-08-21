<template>
  <div class="error-view">
    <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
    <p>404 Page Not Found.</p>
  </div>
  <div class="error-view__tool">
    <div class="error-view__back-to-home" @click="backToHome">
      Back to Home page.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const backToHome = () => {
  router.push({ name: "home" });
};
</script>

<style lang="scss">
.error-view {
  color: #fff;
  font-size: 150px;
  p {
    font-size: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  &__back-to-home {
    font-size: 12px;
    color: #fff;
    border-radius: 5px;
    border: 1px solid #fff;
    margin: 0 auto;
    padding: 8px 20px;
    margin-bottom: 40px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover,
    &:active,
    &:focus,
    &:focus-visible,
    &:focus-within {
      background-color: #fff;
      color: #000;
    }
  }
  &__tool {
    display: flex;
    align-content: center;
    justify-content: center;
  }
}
</style>
