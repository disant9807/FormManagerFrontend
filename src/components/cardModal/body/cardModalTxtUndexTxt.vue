<template>
  <div :class="['d-flex', 'flex-column', 'align-items-' + align].concat(marginClass)">
    <div>
      <slot name="title" />
    </div>
    <div :class="['cardContent__text_' + size, 'cardContent_mt_' + marginBetween, 'cardContent__text_theme-' + theme]">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTxtUndexTxt',
  props: {
    size: {
      type: String,
      default: 'xs'
    },
    marginBetween: {
      type: String,
      default: 'xs'
    },
    theme: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'start'
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
