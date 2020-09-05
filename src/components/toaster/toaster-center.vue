<template>
  <notifications
    group="center"
    :max="3"
    width="600"
    position="top center"
  >
    <template #body="props">
      <div
        :class="['toast', `toast--${props.item.type}`]"
        @click="props.close"
      >
        <div class="toast__icon">
          <font-awesome-icon
            size="lg"
            :icon="['far', formatType(props.item.type)]"
          />
        </div>
        <div
          class="pl-2"
          v-html="props.item.text"
        />
        <div
          v-if="props.item.type !== 'info'"
          class="toast__close-button"
        >
          <font-awesome-icon icon="times" />
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Toaster',
  computed: {
    ...mapGetters([
      'getToastrMsg'
    ])
  },
  methods: {
    formatType (type) {
      const iconType = name => ({
        success: 'check',
        danger: 'exclamation-triangle'
      })[name] || 'exclamation-circle'

      return iconType(type)
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/sass/components/_toastr.scss";
</style>
