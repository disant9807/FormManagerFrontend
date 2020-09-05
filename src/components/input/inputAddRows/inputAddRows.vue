<template>
  <div>
    <div class="form-row">
      <div
        v-for="(header, headerIndex) in schema"
        :key="headerIndex"
        :class="header.class || 'col'"
      >
        <div
          v-if="header.label"
          class="form-group__label"
        >
          {{ header.label }}
          <span
            v-if="header.required"
            aria-hidden="true"
            class="text-danger"
            title="Обязательное поле"
          >*</span>
        </div>
      </div>
      <!--Имитация ширини кнопки-->
      <div
        class="col-auto"
        style="width: 50px;"
      ></div>
    </div>
    <template v-for="(item, itemIndex) in array">
      <!--выключаем валидацию для последнего объекта. Нужно, если при добавлении строки всегда default-->
      <input-add-rows-row
        :key="item.arrayIndex"
        :item="item"
        :item-index="itemIndex"
        :array-length="array.length"
        :schema="schema"
        :v="itemIndex < array.length - 1 && v && v.$each[itemIndex] || null"
        @onAdd="handleAddElement"
        @onDelete="handleDeleteElement(itemIndex)"
        @change="handleUpdateElement(itemIndex, ...arguments)"
      />
    </template>
  </div>
</template>

<script>
import inputAddRowsRow from '@/components/input/inputAddRows/inputAddRowsRow'

export default {
  name: 'InputAddRows',
  components: { inputAddRowsRow },
  props: {
    addRowOnType: {
      type: Boolean,
      default: true
    },
    value: {
      type: [ String, Array, Object ],
      default: () => []
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
  data () {
    return {
      array: [],
      resultArray: [],
      currentIndex: this.value.length || 1
    }
  },
  watch: {
    value: {
      handler () {
        this.setDefaultValues()
      },
      deep: true
    }
  },
  mounted () {
    if (!Array.isArray(this.value)) {
      throw Error('Ошибка props v-models, в inputAddRows нужно передать массив')
    }

    if (!Array.isArray(this.schema)) {
      throw Error('Ошибка props schema, в inputAddRows нужно передать массив')
    }

    /*
    * этот вариант скопирует массив из props и не будет в родителе его менять
    * Это полезно, когда тебе ТУТ нужно добавить элементы, но не хочешь передавать наверх
    * */
    this.array = this.value.map(obj => Object.assign({}, obj))

    this.setDefaultValues()
    this.emitArray()
  },
  methods: {
    setDefaultValues () {
      if (!this.value.length) {
        let defaultObject = {}
        this.array = []
        this.resultArray = []

        this.schema.forEach(item => {
          defaultObject[item.name] = item.default || ''
        })

        /*
        * Мы делаем копию обхекта, иначе при изменении элемента будет менятся на один и тот же результат в обоих массивах
        * */
        this.array.push(Object.assign({}, defaultObject))
        this.resultArray.push(Object.assign({}, defaultObject))

        this.currentIndex = 1
      } else {
        this.array = this.value.map(obj => Object.assign({}, obj))
        this.resultArray = this.value.map(obj => Object.assign({}, obj))

        this.array.forEach((item, index, arr) => {
          arr[index].arrayIndex = index
        })
        this.currentIndex = this.value.length

        if (Object.values(this.array[this.array.length - 1]).every(val => val !== undefined || val !== '')) {
          this.handleAddElement()
        }
      }
    },
    handleAddElement () {
      let obj = {}
      let resultObj = {}
      this.schema.forEach(item => {
        resultObj[item.name] = item.default || ''
        obj[item.name] = item.default || ''
      })

      obj.arrayIndex = this.currentIndex
      this.array.push(obj)
      this.resultArray.push(resultObj)
      this.currentIndex++
    },
    handleDeleteElement (documentIndex) {
      this.array.splice(documentIndex, 1)
      this.resultArray.splice(documentIndex, 1)
      this.emitArray()
    },
    handleUpdateElement (index, key, value, fullValue) {
      /*
      * Если включить default, то запустится бесконечный цикл.
      * добавление идет при любом набранном значении
      * Сделать проверку в inputAddRows. Если хоть одно пустое - не добавлять
      * */
      if (this.resultArray[index][key] !== value) {
        this.$set(this.array[index], key, fullValue)
        this.$set(this.resultArray[index], key, value)
        this.emitArray()
      }

      if (index === this.array.length - 1 && !(Object.values(this.array[index]).some(val => !val)) && this.addRowOnType) {
        this.handleAddElement()
      }
    },
    emitArray () {
      /*
      * Мы не передаем наверх пустую строку
      * */
      const isObject = typeof this.resultArray[this.resultArray.length - 1] === 'object'
      const lastElement = this.resultArray.length ? this.resultArray.length - 1 : 0
      let arrTest = this.resultArray.slice()

      /*
      * Если хотя бы одно поле не заполнено, мы удаляем последний элемент массива
      * */
      if ((isObject && Object.values(this.resultArray[lastElement]).some(value => !value)) || (!isObject && !this.resultArray[lastElement])) {
        arrTest.splice(lastElement, 1)
      }
      // else if (!isObject && !this.resultArray[lastElement]) {
      //   arrTest.splice(lastElement, 1)
      // }

      // OLD 10.10.2019
      // let arr = this.resultArray
      //   .filter(item => {
      //     return typeof item === 'object'
      //       ? !Object.values(item).some(key => !key)
      //       : !item
      //   })

      this.$emit('input', arrTest)
    }
  }
}
</script>
