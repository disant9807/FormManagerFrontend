<template>
  <div
    class="d-flex"
    :class="'flex-' + direction"
  >
    <checkbox
      v-for="(item, itemIndex) in array"
      :key="itemIndex"
      :value="value"
      :input-id="item[trackId] + fieldName"
      :class="[ direction === 'column' ? 'mb-2' : 'mr-3']"
      @input="$emit('input', $event)"
    >
      {{ item[label] }}
    </checkbox>
  </div>
</template>

<script>
import checkbox from '@/components/checkbox/checkbox'

export default {
  name: 'CheckboxArray',
  components: {
    checkbox
  },
  props: {
    fieldName: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      default: () => []
    },
    direction: {
      type: String,
      default: 'row',
      validation: (value) => {
        return ['row', 'column'].indexOf(value) !== -1
      }
    },
    array: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: 'name'
    },
    trackId: {
      type: String,
      default: 'id'
    }
  }
}
</script>
