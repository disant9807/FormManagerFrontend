<template>
  <masked-input
    v-model="inputUppercase"
    autocomplete="off"
    class="form-control tab__inputField"
    :class="{ 'is-invalid' : isValid, 'form-control-sm' : isSmall}"
    :guide="false"
    :mask="serialBoardMask"
    :placeholder="placeholder"
    type="text"
  />
</template>

<script>
import MaskedInput from 'vue-text-mask'

export default {
  name: 'InputRegex',
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
    startCharacters: {
      /*
      * Используется минимум в разделе Серверы (инвентарный номер)
      * */
      type: [ String, RegExp ],
      default: () => /[А-Яа-яA-Za-z0-9]/
    },
    regexMask: {
      /*
      * Используется минимум в разделе Canteen
      * Регулярное выражение на проверку КАЖДОГО символа. Особенность работы vue-text-mask
      * */
      type: RegExp,
      default: () => /[А-Яа-яA-Za-z0-9\s]/
    }
  },
  computed: {
    inputUppercase: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    serialBoardMask (rawValue) {
      let arr = rawValue
        .split('')
        .map((char) => this.regexMask.test(char) ? this.regexMask : false)
      return [ this.startCharacters, ...arr ]
    }
  }
}
</script>
