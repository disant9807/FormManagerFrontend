<template>
  <div class="input-group">
    <masked-input
      v-model="value"
      type="text"
      class="form-control"
      :class="{ 'is-invalid' : isValid }"
      :mask="mask"
      :guide="true"
      placeholder="12:34"
      placeholder-char="_"
      @input="onChangeInput"
    />
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask'

export default {
  name: 'InputTime',
  components: {
    MaskedInput
  },
  props: {
    // валидность поля
    isValid: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: '',
      isRight: false,
      mask: [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/]
    }
  },
  mounted () {
    this.value = this.defaultValue
  },
  methods: {
    onChangeInput () {
      // если первая цифра 2, то  вторая цифра от изменяем маску 0-3
      const regex = /^2/
      if (regex.test(this.value)) {
        this.$set(this.mask, 1, /[0-3]/)
      }
      this.$emit('input', this.value)
    }
  }
}
</script>
