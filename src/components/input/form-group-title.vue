<template functional>
  <div class="row">
    <div class="col">
      <h5 class="text-primary">
        {{ props.name }}
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormGroupTitle',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
