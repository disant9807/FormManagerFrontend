<template>
  <div
    v-on-clickaway="hideDropDownActive"
    class="dd"
  >
    <div
      class="dd__wrap"
      @click="changeVisibility"
    >
      <div class="dd__title">
        <slot name="dropdown-title" />
      </div>
    </div>
    <transition
      name="slide-fade"
      appear
    >
      <div
        v-show="isVisible"
        class="dd__box"
        :style="widthAuto ? 'min-width: auto;' : ''"
        @click="onClick"
      >
        <!--<div class="dd__blur" />-->
        <slot name="dropdown-element" />
      </div>
    </transition>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'

export default {
  name: 'Dropdown',
  directives: {
    ripple: Ripple
  },
  props: {
    closeOnSelect: {
      type: Boolean,
      default: false
    },
    widthAuto: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    changeVisibility () {
      // Переключение видимости true/false
      this.isVisible = !this.isVisible
    },
    hideDropDownActive () {
      // Скрытие элемента на click за областью dropdown
      if (!this.isVisible) return

      this.isVisible = false
    },
    onClick () {
      if (this.closeOnSelect) {
        this.isVisible = false
      }
    }
  }
}
</script>

<style lang="scss">
// Основные стили для dropdown
.dd {
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 14px;
  // @media (min-width: 768px) {
  //   min-width: 220px;
  // }
  &__blur {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: blur(8px);
  }

  &__wrap {
    display: flex;
    align-items: center;
    flex-grow: 1;
    cursor: pointer;
  }

  &__title {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    border-radius: 4px;
    user-select: none;
  }

  &__avatar {
    position: relative;
    width: 30px;

    /* box-shadow: 0 0 0 1px #fff; */

    /* border-radius: 50%; */
    i {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 10px;
      height: 10px;
      background-color: #11c26d;
      border: 2px solid #fff;
      border-radius: 100%;
    }
  }

  &__avatar-img {
    max-height: 30px;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #fff;
    fill: #76838f;
  }

  &__username {
    margin-left: 0.5rem;
    display: block;
    font-size: 18px;
    font-weight: 400;
    white-space: nowrap;
    text-transform: uppercase;
    color: #76838f;
    user-select: none;

    @media (max-width: 585px) {
      display: none;
    }
  }

  &__box {
    position: absolute;
    z-index: 10;
    right: 0;
    bottom: 0;
    display: flex;
    overflow: hidden;

    /* width: 100%; */
    min-width: 220px;
    flex-direction: column;
    text-align: center;

    /* background-color: #f1f4f5; */
    background-color: #fff;
    border-radius: 4px;

    /* box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15); */
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35);
    transform: translateY(100%);

    @media (max-width: 768px) {
      right: -10px;
      width: 211px;
    }

    @media (max-width: $sm) {
      right: -120px;
    }
  }

  &__element {
    z-index: 1;
    padding: 0.572rem 0.5rem;
    display: flex;
    align-items: center;
    line-height: 1;

    /* color: #00000094; */
    color: #76838f;

    svg {
      margin-right: 5px;
      fill: #76838f;
    }

    &:hover,
    &.active {
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
  // Разделитель li элемент линия
  &__element--divider {
    margin: 9px 0;
    padding: 0;
    overflow: hidden;
    height: 1px;
    font-size: 1px;
    background-color: #e5e5e5;
  }
}
</style>
