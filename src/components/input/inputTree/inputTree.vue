<template>
  <div
    v-on-clickaway="hideFormActive"
    class="search"
    :class="{ 'is-invalid': isValid }"
  >
    <div class="search__form">
      <input
        v-model="searchDirectory"
        type="text"
        class="form-control"
        :class="{ 'form-control-sm': isSmall }"
        :placeholder="placeholder"
        @click="clickInputHandler"
        @keyup.esc="hideFormActive"
      >
      <div
        v-if="searchDirectory && allowEmpty"
        title="Очистить"
        class="clear__button cursor-pointer"
        @mousedown.prevent.stop="onClear"
      >
        <font-awesome-icon icon="times" />
      </div>
      <div
        class="search__button cursor-pointer"
        :class="{ 'search--rotate' : !isDropdownOpen }"
        @click="toggleDropdown"
      >
        <font-awesome-icon icon="sort-up" />
      </div>
    </div>
    <div
      v-show="isDropdownOpen"
      class="search__result"
    >
      <v-simplebar class="search__container">
        <input-tree-result
          v-if="initArray"
          :tree="filteredDirectory"
          @onSelect="getData"
        />
        <!--:TODO не работает с v-if="!filteredDirectory.length" ??-->
        <div
          v-else-if="isLoading && !initArray.length"
          class="multiselect__option"
        >
          Загрузка данных...
        </div>
        <div
          v-else
          class="multiselect__option"
        >
          Ничего не найдено
        </div>
      </v-simplebar>
    </div>
  </div>
</template>

<script>
import ApiService from '@/utils/api.service'
import inputTreeResult from '@/components/input/inputTree/inputTreeResult'
import VSimplebar from '@/components/v-simplebar'

export default {
  components: {
    inputTreeResult,
    VSimplebar
  },
  props: {
    value: {
      type: Object,
      default () {
        return {
          label: '',
          value: ''
        }
      }
    },
    data: {
      type: [Array, Object],
      default () {
        return []
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    allowEmpty: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isDropdownOpen: false,
      searchDirectory: '',
      tree: [],
      initArray: this.data,
      isLoading: false
    }
  },
  computed: {
    filteredDirectory () {
      if (!this.tree) {
        return console.log('Ошибка, что-то в директори пошло не так при фильтрации дерева')
      }
      // Если пользователь набрал слово, мы ищем его в массиве
      // const text = this.searchDirectory.toLowerCase()
      const text = (this.value && this.searchDirectory === this.value.label) ? '' : this.searchDirectory.toLowerCase()
      const array = this.deepFilter(text)

      return array.length > 0 ? array : []
    }
  },
  watch: {
    data (newValue) {
      if (this.url) return

      this.initArray = newValue
      this.searchDirectory = this.value && this.value.label ? this.value.label : ''
      this.setTree()
    },
    value: {
      handler () {
        this.searchDirectory = this.value.label
      },
      deep: true
    },
    searchDirectory (newVal, oldVal) {
      if (oldVal && !newVal) {
        this.$emit('input', { value: '', label: '' })
      }
    }
  },
  mounted () {
    this.searchDirectory = this.value && this.value.label ? this.value.label : ''
    if (!this.url) this.setTree()
  },
  methods: {
    hideFormActive () {
      this.isDropdownOpen = false
    },
    clickInputHandler () {
      this.isDropdownOpen = true
    },
    getData (item) {
      this.isDropdownOpen = false

      if (this.searchDirectory !== item.name) {
        this.searchDirectory = item.name
        this.$emit('input', { value: item.id, label: item.name })
      } else {
        this.searchDirectory = ''
      }
    },
    toggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen

      if (this.isDropdownOpen && this.url && !this.initArray.length) {
        this.fetchData()
      }
    },
    fetchData () {
      this.isLoading = true

      ApiService.get(this.url)
        .then(({ data }) => {
          this.initArray = data
          this.setTree()

          this.isLoading = false
        })
        .catch(err => console.error(err))
    },
    makeTree (categories, parent) {
      if (!categories) return
      /*
      * Переделываем входящий массив и рекурсивно перестраиваем в дерево "массив объектов".
      * */
      const node = []

      categories
        .filter(x => x.p_id === parent)
        .forEach((x) => {
          node.push({
            id: x.id,
            name: x.name,
            position: +x.position,
            children: this.makeTree(categories, x.id)
          })
        })
      /*
      * Сортируем элементы в массиве по возрастанию параметра number
      * */
      node.sort((a, b) => a.position - b.position)
      return node
    },
    makeNumericTree (arr, sub) {
      arr.forEach((item, index) => {
        let number = sub ? `${sub}.${index + 1}` : index + 1
        item.number = number
        if (item.children.length) {
          this.makeNumericTree(item.children, number)
        }
      })
    },
    deepFilter (searchItem) {
      /*
      * Если поиск не пустой, мы ищем совпадение в initArray. Иначе мы выводим пронумерованное обычное дерево - numericTree
      * */
      let arr = []

      arr = searchItem
        ? this.initArray.filter((item) => {
          return String(item.name).toLowerCase().match(searchItem)
        })
        : this.tree

      return arr
    },
    setTree () {
      this.tree = this.makeTree(this.initArray, null)
      this.makeNumericTree(this.tree, null)
    },
    onClear () {
      this.searchDirectory = ''
      this.$emit('input', { value: '', label: '' })
    }
  }
}
</script>

<style lang="scss">
  .clear__button {
    position: absolute;
    top: 0;
    right: 25px;
    padding: 7px 0 7px 8px;
  }

  .search__button {
    padding: 7px 8px;

    svg {
      margin-bottom: -3px;
    }
  }

  .search {
    .form-control {
      padding-right: 40px;
    }
  }
</style>
