<template>
  <div
    @click="$emit('click', $event)"
    :class="['cardContent__badge', 'cardContent__badge_' + theme].concat(marginClass)"
  >
    <div :class="['cardContent__text', 'cardContent__text_' + size]">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardBadge',
  props: {
    theme: {
      type: String,
      default: 'blue'
    },
    margin: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: 'xs'
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
