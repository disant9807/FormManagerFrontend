<template>
  <div v-html="markdown" />
</template>

<script>
import * as marked from 'marked'

export default {
  name: 'Markdown',
  props: {
    marked: {
      type: String,
      default: ''
    }
  },
  computed: {
    markdown () {
      return marked(this.marked)
    }
  },
  mounted () {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
      },
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
  }
}
</script>

<style scoped>

</style>
