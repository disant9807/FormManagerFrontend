<template>
  <div
    :class="['cardContent__button', 'cardContent__button_theme-' + theme].concat(marginClass)"
    @click="handleCLick"
  >
    <div :class="['cardContent__text_' + size]">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardButton',
  props: {
    theme: {
      type: String,
      default: 'success'
    },
    margin: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    marginClass () {
      let margin = this.margin.map(item => { return 'cardContent_' + item })
      return margin
    }
  },
  methods: {
    handleCLick () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

</style>
