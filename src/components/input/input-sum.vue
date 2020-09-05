<template>
  <masked-input
    autocomplete="off"
    class="form-control tab__inputField"
    :placeholder="placeholder"
    name="sum"
    type="text"
    required
    :class="{ 'is-invalid' : isValid, 'form-control-sm' : isSmall}"
    :disabled="disabled"
    :value="sum"
    :guide="false"
    :mask="createNumberMask(maskOption)"
    @input="onChangeInput"
  />
</template>

<script>
import MaskedInput from 'vue-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export default {
  name: 'InputSum',
  components: {
    MaskedInput
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    integerLimit: {
      type: Number,
      default: 8
    },
    isValid: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    thousandsSeparatorSymbol: {
      type: String,
      default: ' '
    },
    decimalLimit: {
      type: Number,
      default: 2
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sum: this.value.toString(),
      createNumberMask,
      maskOption: {
        /*
        * Документация:
        * https://github.com/text-mask/text-mask/tree/master/addons/#readme
        * */
        prefix: '',
        thousandsSeparatorSymbol: this.thousandsSeparatorSymbol,
        integerLimit: this.integerLimit,
        decimalLimit: this.decimalLimit,
        allowDecimal: true
      }
    }
  },
  watch: {
    value (newValue) {
      this.sum = newValue.toString()
    }
  },
  methods: {
    onChangeInput (value) {
      this.sum = value
      const sumReg = value.replace(/\s+/g, '')
      this.$emit('input', sumReg)
    }
  }
}
</script>
