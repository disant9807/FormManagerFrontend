<template>
  <div>
    <div v-if="files">
      <input-file-item
        :file="files"
        @onDeleteFile="handleDeleteFile"
      />
    </div>
    <div
      v-else
      class="fileUpload input-group"
      @click="clickInput"
    >
      <input
        ref="fileInput"
        type="file"
        class="fileUpload__fileInput"
        @change="onSelectFile($event)"
      >
      <div
        class="form-control fileUpload__fileName"
        :class="{ 'is-invalid': isInvalid }"
      >
        <span class="text-placeholder">
          {{ placeholder }}
        </span>
      </div>
      <span
        class="flex align-items-center btn btn-success btn--icon fileUpload__btn "
        :class="{ 'btn-danger': isInvalid }"
      >
        <font-awesome-icon icon="cloud-upload" />
      </span>
    </div>
  </div>
</template>

<script>
import inputFileItem from '@/components/input/inputFile/input-file-item'

export default {
  name: 'InputFile',
  components: {
    inputFileItem
  },
  props: {
    fileType: {
      /*
      * Если не передавать значения, то можно загрузить любой файл
      * Есди передать document или image, то будет проверяться расширение по регулярному выражению (смотри функцию checkFileType)
      * Можно передать регулярное выражение для проверки
      * Если передать в строке несколько слов, функция разбивает строку на массив и для каджого элемента делает проверку
      * Таким образом можно проверять Документы, Картинки и какие-то неоговоренные расширения файлов
      * */
      type: [ String, RegExp ],
      default: undefined
    },
    isInvalid: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Выберите файл'
    },
    value: {
      type: [ Object, File ],
      default: () => {}
    }
  },
  data () {
    return {
      files: null
    }
  },
  watch: {
    value (newValue) {
      this.files = newValue
    }
  },
  methods: {
    checkFileType (file) {
      const extension = file.name.substr((file.name.lastIndexOf('.') + 1))
      const image = /(gif|jpg|jpeg|tiff|png)$/ig
      const document = /(doc|docx|odt|ods|pdf|ppt|pptx|txt|xls|xlsx)$/ig
      let bool = false

      if (this.fileType instanceof RegExp) {
        bool = this.fileType.test(extension)
      } else {
        let arr = this.fileType.split(',').map(item => item.trim())

        bool = arr.some(item => {
          if (item === 'image') {
            return image.test(extension)
          } else if (item === 'document') {
            return document.test(extension)
          } else {
            return item === extension
          }
        })
      }

      return bool
    },
    clickInput () {
      this.$refs.fileInput.click()
    },
    setFile (file) {
      this.files = file
      this.$emit('input', this.files)
    },
    onSelectFile (event) {
      const files = event.target.files || event.dataTransfer.files
      if (!files.length) return

      Object.values(files).forEach((item) => {
        if (this.fileType) {
          if (this.checkFileType(item)) {
            this.setFile(item)
          } else {
            let message = 'Неверный формат файла. Выберите файл с расширением: '

            if (this.fileType instanceof RegExp) {
              message = 'Неверный формат файла.'
            } else {
              let arr = this.fileType.split(',').map(item => item.trim())

              arr.forEach((item, itemIndex) => {
                if (item === 'image') {
                  message += 'gif, jpg, jpeg, tiff, png'
                } else if (item === 'document') {
                  message += 'doc, docx, odt, ods, pdf, ppt, pptx, txt, xls, xlsx'
                } else {
                  message += item
                }
                message += (itemIndex === arr.length - 1 ? '.' : ', ')
              })
            }

            this.$store.dispatch('writeMessage', {
              message: message,
              type: 1,
              time: 10000
            })
          }
        } else {
          this.setFile(item)
        }
      })
    },
    handleChangeName (name, index) {
      this.$set(this.files[index], 'name', name)
      this.$emit('input', this.files)
    },
    handleDeleteFile () {
      // пока фаил не загружен, мы можем его удалить из массива
      this.files = null
      this.$emit('input', this.files)
    }
  }
}
</script>

<style lang="scss">
  .fileUpload {
    position: relative;
    display: flex;
    width: 100%;
    align-items: stretch;

    &__fileInput {
      visibility: hidden;
      width: 0;
      height: 0;
    }

    &__fileName {
      position: relative;
      z-index: 2;
      margin-bottom: 0;
      display: flex;
      flex: 1 1 auto;
      align-items: center;
    }

    &__btn {
      position: relative;
      white-space: nowrap;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &.input-group {
      .form-control {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }

    &.is-invalid {
      .form-control {
        border-color: var(--danger);
      }

      .btn {
        background-color: var(--danger);
        border-color: var(--danger);
      }
    }
  }
</style>
