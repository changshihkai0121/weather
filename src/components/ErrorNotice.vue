<template>
  <transition name="slide-fade" mode="out-in">
    <div v-if="noticeError" class="notice-error">
      <div class="notice-error__close" @click="closeError">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </div>
      {{ noticeError }}
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const noticeError = computed(() => store.getters["getNoticeError"]);
const closeError = () => {
  store.commit("SET_ERROR_NOTICE", null);
};

watch(noticeError, () => {
  setTimeout(() => {
    store.commit("SET_ERROR_NOTICE", null);
  }, 3000);
});
</script>

<style lang="scss">
.notice-error {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
  background-color: #000;
  width: 30%;
  color: #c4c4c4;
  text-align: center;
  border-radius: 5px;
  font-size: 14px;
  line-height: 21px;
  padding: 10px 0;
  &__close {
    position: absolute;
    cursor: pointer;
    right: 20px;
    top: 12.5px;
    &:hover,
    &:active,
    &:focus,
    &:focus-visible,
    &:focus-within {
      opacity: 0.7;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-50px) translateX(-50%);
  opacity: 0;
}
</style>
