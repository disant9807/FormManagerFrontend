<template>
  <masked-input
    v-model="inputValue"
    autocomplete="off"
    class="form-control tab__inputField"
    :class="{ 'is-invalid' : isValid, 'form-control-sm' : isSmall}"
    :guide="guide"
    :mask="mask"
    :placeholder="placeholder"
    type="text"
    @blur="$emit('blur')"
  />
</template>

<script>
import MaskedInput from 'vue-text-mask'

export default {
  name: 'InputMask',
  components: {
    MaskedInput
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
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
    mask: {
      type: Array,
      default: () => []
    },
    guide: {
      type: Boolean,
      default: false
    },
    toUpperCase: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', this.toUpperCase ? value.toUpperCase() : value)
      }
    }
  },
  methods: {
    // serialBoardMask (rawValue) {
    //   let arr = rawValue
    //     .split('')
    //     .map((char) => this.anyRegExp.test(char) ? this.anyRegExp : false)
    //   return [this.startCharacters, ...arr]
    // }
  }
}
</script>
