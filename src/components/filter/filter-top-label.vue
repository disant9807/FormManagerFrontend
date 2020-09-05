<template>
  <div :class="['form-group', {'d-flex': (position === `left` || position === `right`)}, {'align-items-start': (position === `left` || position === `right`)}, 'justify-content-'+ align]">
    <label
      v-if="!noLabel && (position === `top` || position === `left`)"
      :class="[{ 'text-danger': isValid }, {'mt-2': position === `left`}, {'mb-0': position === `top`}].concat(labelClass)"
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
    <div
      v-if="(position === `left`|| position === `right` || actionClass.length > 0)"
      :class="actionClass"
    >
      <slot />
    </div>
    <slot
      v-else
    />
    <slot
      name="input-field"
    />
    <label
      v-if="!noLabel && (position === `bottom` || position === `right`)"
      :class="[{ 'text-danger': isValid }, {'mt-2': position === `right`}, {'mb-0': position === `bottom`}].concat(labelClass)"
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
  name: 'FilterTopLabel',
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
  }
}
</script>

<style lang="scss">
  .form-group {
    position: relative;

    &__label {
      font-size: 12px;
    }

    &-showButton {
      position: absolute;
      z-index: 10;
      left: -90px;
      display: none;
      width: 80px;
      height: 35px;
      justify-content: center;
      align-items: center;
      color: white;
      background-color: #62a8ea;
      border-radius: 4px;
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
      transition: 0.2s;

      &::before {
        position: absolute;
        right: -5px;
        width: 10px;
        height: 10px;
        content: '';
        background-color: #62a8ea;
        transition: 0.2s;
        transform: rotate(-45deg);
      }

      &:hover {
        background-color: #4095e5;
        cursor: pointer;

        &::before {
          background-color: #4095e5;
          cursor: pointer;
        }
      }
    }
  }
</style>
