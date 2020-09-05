<template>
  <div
    class="form-group"
    :class="[{'d-flex align-items-start': (isLeft || isRight)}, 'justify-content-'+ align]"
  >
    <label
      v-if="!noLabel && (isTop || isLeft)"
      class="form-group__label"
      :class="[{ 'text-danger': isValid }, {'mt-2': isLeft}, {'mb-0': isTop}, labelClass]"
    >
      {{ name }}
      <span
        v-if="isRequired"
        aria-hidden="true"
        class="text-danger"
        title="Обязательное поле"
      >*</span>
    </label>
    <div
      v-if="(isLeft|| isRight || actionClass.length > 0)"
      :class="actionClass"
    >
      <slot />
    </div>
    <slot
      v-else
    />
    <slot name="input-field" />
    <label
      v-if="!noLabel && (isBottom || isRight)"
      :class="[{ 'text-danger': isValid }, {'mt-2': isRight}, {'mb-0': isBottom}, labelClass]"
      class="form-group__label"
    >
      {{ name }}
      <span
        v-if="isRequired"
        aria-hidden="true"
        class="text-danger"
        title="Обязательное поле"
      >*</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputTopLabel',
  props: {
    name: {
      type: String,
      default: ''
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Boolean,
      default: false
    },
    noLabel: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top'
    },
    labelClass: {
      type: Array,
      default: () => []
    },
    actionClass: {
      type: Array,
      default: () => []
    },
    align: {
      type: String,
      default: 'start'
    }
  },
  computed: {
    isLeft () {
      return this.position === `left`
    },
    isRight () {
      return this.position === `right`
    },
    isBottom () {
      return this.position === `bottom`
    },
    isTop () {
      return this.position === `top`
    }
  }
}
</script>

<style lang="scss">
  .form-group {
    &__label {
      font-size: 12px;
    }
  }
</style>
