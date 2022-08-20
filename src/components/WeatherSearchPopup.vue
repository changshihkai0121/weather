<template>
  <transition>
    <div v-if="props.visible" class="weather-search-popup">
      <i class="weather-search-popup__shadow" @click="shadowClick" />
      <div class="weather-search-popup__search">
        <form action="#" class="weather-search-popup__form">
          <label>
            <input
              type="text"
              v-model="searchContext"
              spellcheck="true"
              placeholder="Search order country weather."
              maxlength="60"
              required
            />
          </label>
          <span class="counter">{{ (searchContext.length - 60) * -1 }}</span>
          <input
            class="weather-search-popup__submit-btn"
            type="button"
            value="Search"
          />
        </form>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";

import type { Ref } from "vue";

interface Props {
  visible: boolean;
}

const searchContext: Ref<string> = ref("");
const emit = defineEmits<{
  (e: "update:visible", status: boolean): void;
}>();
const props = defineProps<Props>();
const shadowClick = (): void => {
  emit("update:visible", false);
};
</script>

<style lang="scss">
.weather-search-popup {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &__search {
    z-index: 1;
    position: relative;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }

  &__shadow {
    background-color: rgba(0, 0, 0, 0.8);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;

    &:hover,
    &:active,
    &:focus,
    &:focus-visible,
    &:focus-within {
      background-color: rgba(0, 0, 0, 0.78);
    }
  }

  &__form {
    display: flex;
    align-items: center;
    label {
      i {
        position: absolute;
        width: 55px;
        text-align: center;
        font-size: 23px;
        color: #c4c4c4;
        pointer-events: none;
      }
      input:valid ~ i {
        color: #c4c4c4;
      }
      input {
        height: 100%;
        width: 100%;
        outline: none;
        padding: 15px 50px 15px 25px;
        font-size: 20px;
        caret-color: #c4c4c4;
        border: 2px solid #ddd;
        border-radius: 5px;
        transition: all 0.1s ease-in-out;
        margin-bottom: 40px;
        background: #2b5876; /* fallback for old browsers */
        background: -webkit-linear-gradient(
          to left,
          #4e4376,
          #2b5876
        ); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(
          to left,
          #4e4376,
          #2b5876
        ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: #fff;
      }
      input::selection {
        color: #fff;
        background: #c4c4c4;
      }
      input:focus,
      input:valid {
        border-color: #c4c4c4;
      }
      input::placeholder {
        color: #c4c4c4;
      }
      // .counter {
      //   position: absolute;
      //   right: 3px;
      //   width: 55px;
      //   font-size: 20px;
      //   color: #c4c4c4;
      //   text-align: center;
      //   border-left: 1px solid #d8d8d8;
      //   pointer-events: none;
      // }
      // input:valid ~ .counter {
      //   color: #c4c4c4;
      //   border-color: #c4c4c4;
      // }
    }
  }
}
</style>
