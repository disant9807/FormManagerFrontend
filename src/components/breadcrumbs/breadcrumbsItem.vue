<template>
  <li
    v-if="route && route.name && (route.meta.bcTitle || route.meta.bcDynamic)"
    :class="{ 'active': idx === arrLength - 1 }"
    class="breadcrumb-item"
  >
    <router-link
      v-if="!route.meta.bcDynamic && route.meta.bcTitle"
      :to="{ name: route.name }"
    >
      {{ route.meta.bcTitle }}
    </router-link>
    <router-link
      v-if="route.meta.bcDynamic && route.meta.bcTrackBy"
      :to="{ name: route.name, params: { [route.meta.bcTrackBy]: $route.params[route.meta.bcTrackBy] } }"
    >
      {{ breadcrumbsTrackBy }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'BreadcrumbsItem',
  props: {
    route: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      required: true
    },
    arrLength: {
      type: Number,
      default: 0
    }
  },
  computed: {
    breadcrumbsTrackBy () {
      const hasTrackBy = this.route.meta.hasOwnProperty('bcTrackBy') && this.route.meta.bcTitle
      console.log(this.route.meta.hasOwnProperty('bcTrackBy'), this.route.meta.bcTitle)
      return hasTrackBy ? this.route.meta.bcTitle : this.$route.params[this.route.meta.bcTrackBy]
    }
  }
}
</script>
