<template>
  <div data-simplebar>
    <slot />
  </div>
</template>

<script>
import 'simplebar'
import 'simplebar/dist/simplebar.min.css'

export default {
  name: 'VSimplebar'
}
</script>
