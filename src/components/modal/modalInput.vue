<template functional>
  <div class="form-group form-row align-items-center">
    <div class="col-md-4 col-12 pr-md-0 text-md-right text-sm-left">
      <label class="mb-0">
        {{ props.label }}
        <slot name="modal-label" />
      </label>
    </div>
    <div class="col-md-8 col-sm-12">
      <slot name="modal-input" />

      <span class="modal-input-error">
        <slot name="modal-error" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.modal-input-error {
  position: relative;
  top: 0;
  right: 0;
  color: #f96868;
}
</style>
