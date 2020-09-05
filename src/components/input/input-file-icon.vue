<template>
  <div class="row">
    <div class="col">
      <label
        v-if="isLabel"
        class="m-0"
        style="padding-right: 10px;"
      >
        {{ labelText }}
      </label>
      <div class="row">
        <div class="col input-group">
          <input
            :id="inputId"
            v-model="inputText"
            type="text"
            class="form-control"
            :class="{'is-invalid': isValid }"
            :placeholder="placeholder"
            @input="inputTextChange($event.target.value)"
          >
          <div class="input-group-append">
            <span class="input-group-text py-0 text-muted">
              <label
                v-b-tooltip.hover
                :title="`Выбрать файл`"
                class="mb-0 cursor-pointer"
              >
                <span
                  class="hidden-input-wrap"
                  :style="`color: ${fileInputIconColor};`"
                >
                  <font-awesome-icon
                    :icon="fileInputIcon"
                    class="hidden-input-icon"
                  />
                </span>
                <input
                  :ref="`${inputId}_file`"
                  type="file"
                  style="display: none;"
                  @change="filesChange($event)"
                >
              </label>
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="checkSelectedFile"
        class="col-12 mt-1 d-flex"
      >
        <span
          class="d-inline-block text-truncate"
          style="max-width: 90%;"
        >
          Выбран файл: {{ inputFile.name }}
        </span>
        <span
          style="cursor: pointer;"
          @click="deleteFile"
        >
          <font-awesome-icon
            icon="trash-alt"
            class="hidden-input-icon ml-2 text-danger"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputFileIcon',
  props: {
    isLabel: {
      type: Boolean,
      default: true
    },
    labelText: {
      type: String,
      default: 'Файл:'
    },
    inputId: {
      type: [String, Number],
      default: 'default_id'
    },
    placeholder: {
      type: String,
      default: 'Название файла'
    },
    fileInputIcon: { // Иконка для скрытого инпута(файл)
      type: String,
      default: 'paperclip'
    },
    fileInputIconColor: { // Цвет для иконки скрытого инпута
      type: String,
      default: '#6c757d'
    },
    fileType: {
      type: String,
      default: '\.(jpg|png)$'
    },
    isValid: {
      type: Boolean,
      default: false
    },
    checkTextName: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputFile: '', // Файл
      inputText: '' // Значение доп инпута
    }
  },
  computed: {
    checkSelectedFile: function () {
      return !!this.inputFile
    }
  },
  methods: {
    filesChange (event) {
      /*
      * Сохр файла
      * */
      const { files } = event.target
      Array.from(files).forEach((file) => {
        if ((new RegExp(this.fileType, 'i')).test(file.name)) { // Проверка формата
          if (!this.checkTextName && !this.inputText) { this.inputTextChange(file.name) }
          this.inputFile = file
          this.$emit('getInputFile', file)
        } else {
          this.$store.dispatch('writeMessage', { message: 'Неверный формат файла', type: 1 })
        }
      })
    },
    deleteFile () {
      this.inputFile = ''
      this.$refs[`${this.inputId}_file`].value = ''
      this.$emit('getInputFile', '')
      this.inputText = ''
      this.$emit('getInputText', '')
    },
    inputTextChange (text) {
      /*
      * Сохр текста из инпута
      * */
      this.inputText = text
      this.$emit('getInputText', text)
    }
  }
}
</script>

<style>
.hidden-input-wrap:hover {
  color: #46be8a;
}
</style>
