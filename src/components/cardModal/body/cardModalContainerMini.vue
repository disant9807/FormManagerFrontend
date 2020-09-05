<template>
  <div
    :class="['cardContent__smallContainer', 'd-flex', 'align-items-center'].concat(marginClass)"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardContainerMini',
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
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
