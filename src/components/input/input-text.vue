<template>
  <div>
    <input
      :value="value"
      class="form-control"
      :placeholder="placeholder"
      :class="{ 'is-invalid' : isValid }"
      @input="onInput"
    >
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    value: {
      type: [ String, Number ],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
      // this.v.$touch()
      // console.log(this.$v.value)
    }
  }
}
</script>
