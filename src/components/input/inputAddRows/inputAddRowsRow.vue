<template>
  <div
    class="form-row"
    :class="{ 'mb-2': itemIndex < arrayLength - 1 }"
  >
    <div
      v-for="(obj, objIndex) in schema"
      :key="objIndex"
      :class="obj.class || 'col'"
    >
      <input-add-rows-element
        v-if="obj.name"
        :settings="obj"
        :value="item[obj.name]"
        :v="obj.required && v ? v[obj.name] : null"
        @onChange="handleChangeElement(obj.name, ...arguments)"
      />
      <slot
        v-if="obj.slot"
        :name="obj.slot"
      />
    </div>

    <!--Кнопки Добавить\Удалить-->
    <div class="col-auto">
      <div
        v-if="itemIndex < arrayLength - 1"
        class="btn btn-danger"
        @click="$emit('onDelete')"
      >
        <font-awesome-icon icon="minus" />
      </div>
      <div
        v-else
        class="btn btn-success"
        @click="$emit('onAdd')"
      >
        <font-awesome-icon icon="plus" />
      </div>
    </div>
  </div>
</template>

<script>
import inputAddRowsElement from '@/components/input/inputAddRows/inputAddRowsElement'

export default {
  name: 'InputAddRowsRow',
  components: {
    inputAddRowsElement
  },
  props: {
    arrayLength: {
      type: Number,
      required: true
    },
    itemIndex: {
      type: Number,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    schema: {
      type: Array,
      required: true
    },
    v: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleChangeElement (key, value, fullValue) {
      this.$emit('change', key, value, fullValue)
    }
  }
}
</script>
