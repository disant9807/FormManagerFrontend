<template lang="pug">
  label.radio
    input(type="radio" :value="label" :name="name" v-model="radioButtonValue")
    span {{ label }}
</template>

<script>
export default {
  name: 'Radio',
  props: ['name', 'label', 'value'],
  computed: {
    radioButtonValue: {
      get () {
        return this.value
      },
      set () {
        this.$emit('change', this.label)
      }
    }
  }
}
</script>
