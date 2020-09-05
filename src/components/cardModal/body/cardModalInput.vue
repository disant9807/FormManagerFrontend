<template>
  <input
    v-model="content"
    v-bind="$attrs"
    :class="['form-control', 'material__input', 'cardContent__text_' + size].concat(marginClass)"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="handleInput"
  >
</template>

<script>
export default {
  name: 'CardInput',
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default'
    },
    margin: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      content: this.value
    }
  },
  computed: {
    marginClass () {
      let margin = this.margin.map(item => { return 'cardContent_' + item })
      return margin
    }
  },
  watch: {
    value (newValue) {
      this.content = newValue
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.content)
    }
  }
}
</script>
