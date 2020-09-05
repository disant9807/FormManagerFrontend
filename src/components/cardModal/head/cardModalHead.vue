<template>
  <div>
    <div class="d-flex justify-content-between">
      <slot />
    </div>
  </div>
</template>

<script>
import cardModalMargin from '@/components/cardModal/body/cardModalMargin'
export default {
  name: 'CardModalHead',
  components: {
    cardModalMargin
  }
}
</script>

<style scoped>

</style>
