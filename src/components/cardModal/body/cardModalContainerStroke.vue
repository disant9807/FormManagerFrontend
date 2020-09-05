<template>
  <div
    :class="['cardContent__strokeContainer', 'd-flex', 'align-items-center'].concat(marginClass)"
  >
    <slot>

    </slot>
  </div>
</template>

<script>
export default {
  name: 'CardContainerStroke',
  props: {
    margin: {
      type: Array,
      default: () => []
    },
    eventOnAnim: {
      type: Boolean,
      default: false
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
