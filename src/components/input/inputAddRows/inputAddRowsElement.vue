<template>
  <input-element-component
    :settings="settings"
    :value="selected"
    :is-small="isSmall"
    :v="v"
    @onChange="emitResult"
  />
</template>

<script>
import inputElementComponent from '@/components/input/input-element-component'

export default {
  name: 'InputAddRowsElement',
  components: {
    inputElementComponent
  },
  props: {
    isSmall: {
      type: Boolean,
      default: false
    },
    settings: {
      type: Object,
      required: true
    },
    value: {
      type: [ Object, String, Number ],
      required: true
    },
    v: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  watch: {
    value (newValue) {
      if (this.selected !== newValue) {
        // console.log('inputAddRowsElement watch value: ', newValue)
        this.selected = newValue
      }
    }
  },
  methods: {
    emitResult (result, fullResult) {
      this.selected = fullResult
      this.$emit('onChange', result, fullResult)

      if (this.v) {
        this.v.$touch()
      }
    }
  }
}
</script>
