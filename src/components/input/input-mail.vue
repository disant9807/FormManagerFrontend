<template>
  <div class="input-group">
    <div
      v-if="side !== 'right' && isIcon"
      class="input-group-prepend"
    >
      <span class="input-group-text">
        <font-awesome-icon
          :icon="['far', 'envelope']"
          fixed-width
        />
      </span>
    </div>
    <input
      :value="value"
      type="email"
      class="form-control"
      placeholder="name@example.ru"
      :class="{ 'is-invalid' : isValid }"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
    >
    <div
      v-if="isValid && !disableErrorMessage"
      class="invalid-feedback"
    >
      Пожалуйста, введите email формата: name@example.ru
    </div>
    <div
      v-if="side === 'right' && isIcon"
      class="input-group-prepend"
    >
      <span class="input-group-text">
        <font-awesome-icon
          :icon="['far', 'envelope']"
          fixed-width
        />
      </span>
    </div>
  </div>
</template>

<script>
import emailMask from 'text-mask-addons/dist/emailMask'

export default {
  name: 'InputTel',
  props: {
    value: {
      type: String,
      default: ''
    },
    // наличие иконки (изначально есть)
    isIcon: {
      type: Boolean,
      default: true
    },
    /* С какой стороны показать иконку
    * left (по умолчанию), right */
    side: {
      type: String,
      default: 'left'
    },
    // валидность поля
    isValid: {
      type: Boolean,
      default: false
    },
    disableErrorMessage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      emailMask
    }
  }
}
</script>
