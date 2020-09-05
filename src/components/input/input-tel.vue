<template>
  <div class="input-group">
    <div
      v-if="side !== 'right' && isIcon"
      class="input-group-prepend"
    >
      <span class="input-group-text">
        <font-awesome-icon
          icon="phone"
          fixed-width
        />
      </span>
    </div>
    <masked-input
      :value="value"
      type="text"
      class="form-control"
      :class="{ 'is-invalid' : isValid }"
      :mask="['+','7','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
      :guide="true"
      :placeholder="placeholder"
      placeholder-char="_"
      @input="$emit('input', $event)"
    />
    <div
      v-if="side === 'right' && isIcon"
      class="input-group-prepend"
    >
      <span class="input-group-text">
        <font-awesome-icon icon="phone" />
      </span>
    </div>
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask'

export default {
  name: 'InputTel',
  components: {
    MaskedInput
  },
  props: {
    placeholder: {
      type: String,
      default: '+7(950) 123-456'
    },
    // наличие иконки (изначально есть)
    value: {
      type: [ String, Number ],
      default: ''
    },
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
    }
  }
}
</script>
