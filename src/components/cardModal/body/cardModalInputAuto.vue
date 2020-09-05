<template>
  <input-autocomplete
    v-model="content"
    v-bind="$attrs"
    :input-class="[ 'cardContent__text_' + size].concat(inputClass)"
    :class="marginClass"
    @input="handleInput"
  />
</template>

<script>
import inputAutocomplete from '@/components/input/input-autocomplete'
export default {
  name: 'CardInputAuto',
  components: {
    inputAutocomplete
  },
  props: {
    size: {
      type: String,
      default: 'default'
    },
    margin: {
      type: Array,
      default: () => []
    },
    inputClass: {
      type: Array,
      default: () => []
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
  methods: {
    handleInput (e) {
      this.$emit('input', this.content)
    }
  }
}
</script>
