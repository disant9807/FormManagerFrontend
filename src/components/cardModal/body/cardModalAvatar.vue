<template>
  <img
    v-if="src"
    :src="src"
    :class="['cardContent__avatar', 'cardContent__avatar_size-' + size].concat(marginClass)"
  >
  <div
    v-else
    :class="['cardContent__avatar', 'cardContent__avatar_size-' + size]"
  ></div>
</template>

<script>
export default {
  name: 'CardAvatar',
  props: {
    size: {
      type: String,
      default: 'base'
    },
    src: {
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
