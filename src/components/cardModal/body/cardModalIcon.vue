<template>
  <div
    :class="['cardContent__icon'].concat(marginClass)"
    @click="handleCLick"
  >
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      :size="size"
    />
  </div>
</template>

<script>
export default {
  name: 'CardIcon',
  props: {
    icon: {
      type: [String, Array],
      default: ''
    },
    size: {
      type: String,
      default: '1x'
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
  },
  methods: {
    handleCLick () {
      this.$emit('click')
    }
  }
}
</script>
