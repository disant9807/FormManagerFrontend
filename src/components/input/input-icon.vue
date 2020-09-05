<template>
  <div class="input-group input-icon">
    <div
      v-if="!isRight"
      class="input-group-prepend"
    >
      <span class="input-group-text">
        <font-awesome-icon
          :icon="iconName"
          :size="iconSize"
          fixed-width
        />
      </span>
    </div>
    <input
      :ref="id"
      :value="value"
      :type="getType"
      class="form-control"
      :class="{ 'is-invalid' : isValid }"
      :placeholder="placeholder"
      autocomplete="off"
      readonly
      @focus="removeReadOnly"
      @input="$emit('input', $event.target.value)"
    >
    <div
      v-if="isRight"
      class="input-group-prepend"
    >
      <span class="input-group-text">
        <font-awesome-icon
          :icon="iconName"
          :size="iconSize"
          fixed-width
        />
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InputIcon',
  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: [ String, Number ]
    },
    // иконка
    iconName: {
      type: String,
      default: ''
    },
    // размер иконки
    iconSize: {
      type: String
    },
    /* С какой стороны показать иконку
    * left (по умолчанию), right */
    side: {
      type: String,
      default: 'left'
    },
    // валидность поля
    isValid: {
      type: Boolean,
      default: false
    },
    // placeholder
    placeholder: {
      type: String,
      default: ''
    },
    /* Тип поля
    *  password или text(по умолчанию) */
    type: {
      type: String,
      default: 'text'
    },
    defaultValue: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      input: this.defaultValue,
      isRight: false
    }
  },
  computed: {
    getType () {
      return this.type === 'password' ? 'password' : 'text'
    }
  },
  created () {
    if (this.side === 'right') this.isRight = true
  },
  methods: {
    onChangeInput () {
      this.$emit('input', this.input)
    },
    removeReadOnly () {
      let inputElement = this.$refs[this.id]
      if (inputElement.hasAttribute('readonly')) {
        inputElement.removeAttribute('readonly')
        // fix for mobile safari to show virtual keyboard
        inputElement.blur()
        inputElement.focus()
      }
    }
  }
}
</script>

<style lang="scss">
  .form-control:disabled,
  .form-control[readonly] {
    background-color: #fff;
  }
</style>
