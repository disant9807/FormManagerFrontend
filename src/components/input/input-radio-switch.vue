<template>
  <div class="custom-control custom-switch">
    <input
      :id="id"
      :checked="isChecked"
      class="custom-control-input"
      type="checkbox"
      @click="handleChange"
    >
    <label
      class="custom-control-label cursor-pointer"
      :for="id"
    >
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: 'RadioSwitch',
  props: {
    id: {
      /*
      * Для уникального id у лейбла и инпута
      * */
      type: [String, Number],
      required: true
    },
    value: {
      /*
      * Для работы с v-model
      * */
      type: [Boolean, String, Number],
      default: false
    }
  },
  computed: {
    isChecked () {
      /*
      * значения могут приходить в виде '1', '0', 'true', 'false', true, false, 1, 0.
      * Мы парсим значение и оно распознается как булевое для input
      * */
      return JSON.parse(this.value)
    }
  },
  methods: {
    handleChange (event) {
      this.$emit('change', event.target.checked)
    }
  }
}
</script>
