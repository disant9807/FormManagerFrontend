<template>
  <div>
    <vheader :title="documentTitle" />
    <slot />

  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    vheader: () => import(/* webpackChunkName: "header" */'@/components/layout/header/header')
  },
  computed: {
    documentTitle () {
      return document.title
    }
  }
}
</script>
