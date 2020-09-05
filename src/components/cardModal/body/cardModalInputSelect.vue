<template>
  <input-select
    v-bind="$attrs"
    :value="dataContent"
    :input-class="['form-control', 'material__input', 'cardContent__text_' + size].concat(marginClass)"
    @input="handleInput($event)"
  />
</template>

<script>
import inputSelect from '@/components/input/input-select'

export default {
  name: 'CardModalInputSelect',
  components: {
    inputSelect
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
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      dataContent: this.value
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
      this.dataContent = newValue
    }
  },
  methods: {
    handleInput (data) {
      this.dataContent = data
      this.$emit('input', this.dataContent)
    }
  }
}
</script>

<style scoped>

</style>
