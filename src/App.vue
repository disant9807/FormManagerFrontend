<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>

    <toaster />
    <toaster-center />
  </div>
</template>

<script>
import defaultLayout from '@/layouts/defaultLayout'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    defaultLayout,
    plain: () => import(/* webpackChunkName: "plainLayout" */'@/layouts/plainLayout'),
    toaster: () => import(/* webpackChunkName: "toaster" */'@/components/toaster/toaster'),
    toasterCenter: () => import(/* webpackChunkName: "toaster-center" */'@/components/toaster/toaster-center')
  },
  computed: {
    ...mapGetters(['getErrorCardStatus', 'getUserid']),
    layout () {
      return this.$route.meta.layout || 'default-layout'
    }
  }
}
</script>

<style lang="scss">
@import './assets/sass/_main';
</style>
