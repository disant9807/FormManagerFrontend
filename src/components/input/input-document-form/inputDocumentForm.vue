<template>
  <div>
    <input-document-element
      v-for="(document, documentIndex) in array"
      :key="document.arrayIndex"
      :doc="document"
      :doc-index="documentIndex"
      :array-length="array.length"
      @onAdd="handleAddElement"
      @onDelete="handleDeleteElement(documentIndex)"
      @change="handleUpdateElement(documentIndex, ...arguments)"
    />
  </div>
</template>

<script>
import inputDocumentElement from '@/components/input/input-document-form/inputDocumentElement'

export default {
  name: 'NomenclatureDocumentForm',
  components: {
    inputDocumentElement
  },
  props: {
    value: {
      type: Array,
      default () {
        return [
          {
            name: '',
            type: 1,
            files: ''
          }
        ]
      }
    }
  },
  data () {
    return {
      array: this.value,
      currentIndex: this.value.length || 1
    }
  },
  mounted () {
    if (!Array.isArray(this.value)) {
      throw Error('Ошибка! В inputDocumentForm нужно передать массив')
    }

    if (!this.value.length) {
      this.array = [
        {
          name: '',
          type: 1,
          files: ''
        }
      ]
      this.currentIndex = 1
    } else {
      this.array = this.value
      this.currentIndex = this.value.length
    }
  },
  methods: {
    handleAddElement () {
      this.array.push({
        name: '',
        type: 1,
        files: '',
        arrayIndex: this.currentIndex
      })
      this.currentIndex++
    },
    handleDeleteElement (documentIndex) {
      this.array.splice(documentIndex, 1)

      this.emitArray()
    },
    handleUpdateElement (index, key, value) {
      this.array.forEach((item, itemIndex, arr) => {
        arr[index][key] = value
      })

      if (key === 'files' && index === this.array.length - 1) {
        this.handleAddElement()
      }

      this.emitArray()
    },
    emitArray () {
      let resultArray = this.array.filter(item => !!item.files)
      this.$emit('input', resultArray)
    }
  }
}
</script>
