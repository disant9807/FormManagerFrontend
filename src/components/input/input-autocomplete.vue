<template>
  <div
    v-on-clickaway="hideFormActive"
    class="search"
  >
    <spinnerBattlenet
      v-if="isLoading"
      class="search__spinner"
      :size="16"
    />
    <input
      :ref="`autocomplete_${id}`"
      type="text"
      class="form-control"
      :class="[{'search--input-active': formInputActive && listArray.length}, {'is-invalid': isValid }, {'form-control-sm': isSmall}].concat(inputClass)"
      :value="inputText.label"
      :placeholder="placeholder"
      :disabled="disabled"
      autocomplete="off"
      @input="changeValue($event.target.value)"
      @click="handleFormActive(true)"
      @keyup="debounceSearch($event)"
    >
    <transition
      name="fade"
      mode="in-out"
    >
      <div
        v-show="formInputActive"
        class="search__result"
      >
        <v-simplebar>
          <ul>
            <li
              v-if="isError"
              class="dropdown-item"
            >
              Ничего не найдено
            </li>
            <li
              v-for="(item, itemIndex) in listArray.slice(0, 10)"
              v-else
              :key="itemIndex"
              class="dropdown-item"
              @click="getData(item)"
            >
              {{ item.label }}
            </li>
          </ul>
        </v-simplebar>
      </div>
    </transition>
  </div>
</template>

<script>
import ApiService from '@/utils/api.service'
import spinnerBattlenet from '@/components/spinner/spinner-battlenet'
import VSimplebar from '@/components/v-simplebar'
import debounce from 'lodash/debounce'

export default {
  name: 'InputAutocomplete',
  components: {
    spinnerBattlenet,
    VSimplebar
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    url: {
      type: String,
      default: 'staff/autocomplete'
    },
    params: {
      type: Array,
      default () { return [] }
    },
    value: {
      type: [String, Object],
      default () {
        return {
          label: '',
          value: ''
        }
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    isValid: {
      type: Boolean,
      default: false
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      inputText: {
        label: this.value.label || '',
        value: this.value.value || ''
      },
      listArray: [],
      formInputActive: false,
      isLoading: false,
      isError: false
    }
  },
  watch: {
    value: {
      handler: function (newValue) {
        if (!newValue.value) {
          this.listArray = []
          this.inputText = {
            label: '',
            value: ''
          }
          this.formInputActive = false
          return
        }
        this.inputText.label = newValue.label
        this.inputText.value = newValue.value
        this.$emit('input', this.inputText)
      },
      deep: true
    }
  },
  methods: {
    getData (data) {
      this.inputText = data
      this.formInputActive = false
      this.$emit('input', data)
      this.$emit('change', data)
      if (this.id) {
        this.$nextTick(() => {
          this.$refs[`autocomplete_${this.id}`].focus()
        })
      }
    },
    handleFormActive (boolean) {
      this.formInputActive = this.listArray.length ? boolean : false
    },
    hideFormActive () {
      /*
      * для clickaway only
      * */
      this.formInputActive = false
    },
    changeValue (search) {
      this.inputText.label = search
    },
    debounceSearch:
      debounce(function (event) {
        if (event.code === 'Enter') { return }
        this.fetchingSearchData()
      }, 200),
    fetchingSearchData () {
      this.formInputActive = true
      /*
      * Если поле ввода пустое скрываем список
      * */
      if (!this.inputText.label) {
        let obj = { label: '', value: '' }
        this.listArray = []
        this.$emit('input', obj)
        this.$emit('change', obj)
        return
      }

      // if (this.value.label === this.inputText.label) return
      /*
      * Отображаем спинер
      * */
      this.isLoading = true
      this.isError = false

      let data = { term: this.inputText.label }

      if (this.params.length) {
        /*
        * Дополнительные параметры
        * */
        this.params.forEach((param, index) => {
          data[`fields[${index}][name]`] = param.name
          data[`fields[${index}][value]`] = param.value
        })
      }

      ApiService.post(this.url, data)
        .then(({ data }) => {
          /*
          * Даем спинеру докрутиться и отключаем
          * */
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
          if (data.length < 2 && (data[0]).value === '0') {
            /*
            * Если совпадений нет, сервер присылает ответ { value: 0, label: null }
            * этот ответ мы и обрабатываем
            * */
            this.isError = true
            /*
            * customValue если совпадений нет, но необходимо отправить значение из поля автокомплита
            * Используется в objectsregistry
            * */
            this.$emit('customValue', { value: this.inputText.label, label: this.inputText.label })
            return
          }
          this.$emit('customValue', { value: '', label: '' })
          /*
          * Записываем данные в массив
          * */
          this.listArray = data
        })
        .catch(err => console.error('Динамический поиск получил следующую ошибку: ', err))
    }
  }
}
</script>
