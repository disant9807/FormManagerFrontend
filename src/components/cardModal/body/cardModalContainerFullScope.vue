<template>
  <div class="cardContent__fullscope fullscope w-100 h-100">
    <div class="fullscope__content h-100 w-100 d-flex justify-content-center align-items-center">
      <div class="fullscope__main">
        <slot />
      </div>
      <div
        class="fullscope__shadow"
        @click="handleClickBackground"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardModalContainerFullScope',
  methods: {
    handleClickBackground () {
      this.$emit('clickBackground')
    }
  }
}
</script>

<style lang="scss">
  .cardContent {
    &__fullscope {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      overflow: hidden;
      border-radius: 10px;
    }
  }

  .fullscope {
    &__shadow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      opacity: 0.5;
      background-color: lighten($dark, 5%);
    }

    &__main {
      position: absolute;
      z-index: 2;
    }

    &__content {
      position: relative;
    }
  }
</style>
