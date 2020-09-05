<template>
  <div :class="['cardContent__text_' + size, 'cardContent__text_theme-' + theme].concat(marginClass)">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardTxt',
  props: {
    size: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: ''
    },
    margin: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    marginClass () {
      let margin = this.margin.map(item => { return 'cardContent_' + item })
      return margin
    }
  }
}
</script>

