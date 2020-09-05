<template functional>
  <span
    class="badge"
    :class="props.status === 1 ? 'badge-success' : 'badge-dark'"
  >
    {{ props.status === 1 ? 'Активный' : 'Архивный' }}
  </span>
</template>

<script>
export default {
  name: 'DtableStatusBadge',
  props: {
    status: {
      type: [ String, Number ],
      required: true
    }
  }
}
</script>
