<template>
  <div class="cntr">
    <label
      :for="inputId"
      :class="{ 'disabled': disabled }"
      class="label-cbx"
    >
      <input
        :id="inputId"
        v-model="checkedComputed"
        type="checkbox"
        class="invisible"
        :value="inputId"
        :disabled="disabled"
        @change="onChange"
      >
      <span
        class="checkbox"
        :class="['checkbox--' + color, 'checkbox--size' + size]"
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
        >
          <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z" />
          <polyline points="4 11 8 15 16 6" />
        </svg>
      </span>
      <span
        v-if="$slots.default"
        class="checkbox__title ml-2"
      >
        <slot />
      </span>
      <slot name="title" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox1',
  props: {
    inputId: {
      type: [ String, Number ],
      default: 'checkbox'
    },
    value: {
      type: [ Boolean, String, Array, Object, Number ],
      default: false
    },
    color: {
      /*
      * передавать можно только бутстраповские названия цветов
      * */
      type: String,
      default: 'primary'
    },
    size: {
      /*
      * Смотри scss, там указаны все доступные размеры чекбокса
      * */
      type: Number,
      default: 24
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checkedProxy: false
    }
  },
  computed: {
    checkedComputed: {
      get () {
        let notArray = typeof this.value === 'string' || typeof this.value === 'boolean' || typeof this.value === 'number'
        // console.log('checkedComputed', notArray, notArray ? JSON.parse(this.value) : this.value)
        return notArray ? JSON.parse(this.value) : this.value
      },
      set (val) {
        this.checkedProxy = val
      }
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.checkedProxy)
    }
  }
}
</script>

<style lang="scss">
$sizes: 16, 24, 32;

.label-cbx {
  margin-bottom: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &.disabled {
    cursor: not-allowed;
  }

  input:not([disabled]):checked {
    & + .checkbox {
      border-color: #62a8ea;

      svg path {
        fill: #62a8ea;
        stroke-dashoffset: 0;
      }

      svg polyline {
        stroke-dashoffset: 0;
      }
    }
  }

  input:disabled {
    & ~ span {
      opacity: 0.65;
    }

    & + .checkbox svg path {
      fill: scale-color(#c8ccd4, $lightness: 80%);
    }
  }

  &:hover {
    input:not([disabled]) + .checkbox {
      svg path {
        stroke-dashoffset: 0;
      }
    }
  }

  .checkbox {
    position: relative;
    width: 24px;
    height: 24px;
    border: 2px solid #c8ccd4;
    border-radius: 3px;

    svg {
      position: absolute;
      top: -2px;
      left: -2px;
      width: 24px;
      height: 24px;

      path {
        transition: all 0.6s ease;
        fill: none;
        stroke: #62a8ea;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 71px;
        stroke-dashoffset: 71px;
      }

      polyline {
        transition: all 0.3s ease;
        fill: none;
        stroke: #fff;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 18px;
        stroke-dashoffset: 18px;
      }
    }

    @for $i from 1 through length($sizes) {
      &--size#{nth($sizes, $i)}, &--size#{nth($sizes, $i)} svg {
        width: nth($sizes, $i) + px;
        height: nth($sizes, $i) + px;
      }
    }

    @each $color, $hash in $theme-colors {
      &--#{$color} svg path {
        stroke: $hash;
      }
    }
  }

  > span {
    vertical-align: middle;
    pointer-events: none;
  }
}

.invisible {
  position: absolute;
  z-index: -1;
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
