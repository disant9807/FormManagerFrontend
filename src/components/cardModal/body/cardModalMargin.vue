<template>
  <div :class="marginClass">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CardMargin',
  props: {
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

<style scoped>

</style>
