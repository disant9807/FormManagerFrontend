<template>
  <div
    class="dt-spinner"
    :class="fixed ? 'dt-spinner--fixed' : 'dt-spinner--absolute'"
  >
    <div :style="{ width: size + 'px', height: size + 'px'}">
      <spinner-battlenet
        :size="size"
        color="bnet"
      />
    </div>
    <span
      v-if="placeholder"
      class="ml-2"
      :class="placeholderClass"
    >
      {{ placeholder }}
    </span>
  </div>
</template>

<script>
import spinnerBattlenet from '@/components/spinner/spinner-battlenet'

export default {
  components: {
    spinnerBattlenet
  },
  props: {
    size: {
      type: Number,
      default: 32
    },
    color: {
      type: String,
      default: 'bnet'
    },
    fixed: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    placeholderClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.dt-spinner {
  position: absolute;
  z-index: 9;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);

  &--fixed {
    position: fixed;
  }

  &--absolute {
    position: absolute;
  }

  &__block {
    margin: 0 auto;
  }
}
</style>
