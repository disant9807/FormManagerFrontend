<template>
  <div class="input-select-autocomplete">
    <multiselect
      v-model="selectedValue"
      :allow-empty="allowEmpty"
      :class="[{ 'is-invalid': isValid }, { 'bootstrap-control-sm': isSmall }, inputClass]"
      :close-on-select="closeOnSelect"
      :disabled="disabled"
      :hide-selected="hideSelected"
      :internal-search="internalSearch"
      :label="label"
      :limit="limit"
      :limit-text="limitText"
      :multiple="multiple"
      :max-height="maxHeight"
      :options="optionsData"
      :placeholder="placeholder"
      :preselect-first="preselectFirst"
      :preserve-search="preserveSearch"
      :searchable="searchable"
      :show-labels="false"
      :taggable="taggable"
      tag-placeholder=""
      :track-by="trackBy"
      @input="onSelectTag"
      @open="onOpen"
      @close="$emit('close')"
      @remove="onRemoveResult"
      @select="onSelectResult"
      @search-change="debounceSearch"
    >
      <!-- Pass on all named slots -->
      <slot
        v-for="slot in Object.keys($slots)"
        :slot="slot"
        :name="slot"
      />
      <!-- Pass on all scoped slots -->
      <template
        v-for="slot in Object.keys($scopedSlots)"
        :slot="slot"
        slot-scope="scope"
      >
        <slot
          :name="slot"
          v-bind="scope"
        />
      </template>
      <template #clear>
        <div
          v-if="allowEmpty && selectedValue && !taggable"
          title="Очистить"
          class="multiselect__clear"
          @mousedown.prevent.stop="onClear"
        >
          <font-awesome-icon icon="times" />
        </div>
      </template>
      <template #noOptions>
        <span>{{ noResultText }}</span>
      </template>
      <template #noResult>
        <span v-if="!noResultSlot">Ничего не найдено</span>
        <slot
          v-else
          name="noResult"
        />
      </template>
    </multiselect>
  </div>
</template>

<script>
import ApiService from '@/utils/api.service'
import Multiselect from 'vue-multiselect'
import debounce from 'lodash/debounce'

export default {
  name: 'InputSelect',
  components: { Multiselect },
  props: {
    noResultSlot: {
      type: Boolean,
      default: false
    },
    allowEmpty: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledOpen: {
      /*
      * true если нужно запретить делать запрос при пустом значении или onOpen
      * false - при пустом значении или onOpen будет делаться запрос
      *
      * Если true у нас при каждом выборе очищается optionsData, чтобы не делать лишний запрос на сервер
      * */
      type: Boolean,
      default: true
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    hideSelected: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Boolean,
      default: false
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'label'
    },
    internalSearch: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 9999
    },
    limitText: {
      type: Function,
      default: (count) => `и еще ${count}`
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: Number,
      default: 300
    },
    searchable: {
      type: Boolean,
      default: false
    },
    querySearchName: {
      /*
      * Определяет по какому ключу будет отправляться текст поиска
      * По-умолчанию "term"
      * */
      type: String,
      default: 'term'
    },
    storage: {
      type: Object,
      default () {
        return {
          store: false,
          name: ''
        }
      }
    },
    options: {
      type: Array,
      default: () => []
    },
    filterOptions: {
      /*
      * Если нужно отфильтровать список доступных элементов в списке передать props: filterOptions(массив не нужных эл-ов)
      * */
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Выберите'
    },
    preselectFirst: {
      type: Boolean,
      default: false
    },
    preserveSearch: {
      type: Boolean,
      default: false
    },
    trackBy: {
      type: String,
      default: 'label'
    },
    taggable: {
      type: Boolean,
      default: false
    },
    value: {
      type: [ String, Number, Array, Object ],
      default: ''
    },
    requestMethod: {
      /*
      * Если необходимо изменить request method get/post
      * */
      type: String,
      default: 'get'
    },
    url: {
      type: String,
      default: ''
    },
    urlData: {
      type: Object,
      default: null
    },
    inputClass: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedValue: this.value,
      optionsData: this.options
    }
  },
  computed: {
    noResultText () {
      if (this.url) {
        return !this.disabledOpen ? 'Данные отсутствуют' : 'Введите для поиска'
      } else {
        return 'Данные отсутствуют'
      }
    }
  },
  watch: {
    value (newValue) {
      this.selectedValue = newValue
    },
    options (value) {
      this.optionsData = value
    }
  },
  mounted () {
    // 09.12.2019
    // Внесены правки 23.01.2020 под объект с ключом и значением {id: '', name: ''}
    // Проверка, если приходит из конструктора форм label и value - undefined или пустые поля.
    // В таком случае записываем null, чтобы placeholder отобразился у пользователя
    if (
      this.selectedValue &&
      this.selectedValue.hasOwnProperty(this.trackBy) &&
      this.selectedValue.hasOwnProperty(this.label) &&
      !this.selectedValue[this.trackBy] &&
      !this.selectedValue[this.label]
    ) {
      this.selectedValue = null
    }
  },
  methods: {
    onClear () {
      this.onRemoveResult()
    },
    onOpen () {
      this.$emit('open')

      if (this.url && !this.disabledOpen) {
        let dataSend = {}

        if (this.urlData) { dataSend = this.urlData }

        ApiService[this.requestMethod](this.url, dataSend)
          .then(({ data }) => {
            if (typeof data === 'string') {
              this.optionsData = []

              return
            }

            /*
            * Если нужно отфильтровать список доступных элементов в списке
            * */
            if (this.filterOptions.length) {
              // TODO: Используется в nomenclatureActCard && nomenclatureOutputActForm
              // Как пример Основная информация(акт выдачи)
              // Если выбрать Ультразвуковой отпугиватель крыс, справа в кодах появится список значений.
              // При выборе значения оно пропадет из списка
              // Игорь, зачем это нужно было? Может мы можем обойтись свойством vue-multiselect hideSelected?
              this.optionsData = data.filter(option => {
                return !this.filterOptions.some(element => element[this.trackBy] === option[this.trackBy])
              })
            } else {
              if (data && Array.isArray(data) && data.length) {
                const hasSingleResultFalseValues = data.length < 2 && (!data[0][this.label] || !data[0][this.trackBy])
                const hasArrayFalseItems = data.some(value => !value)

                this.optionsData = hasSingleResultFalseValues || hasArrayFalseItems ? [] : data
              } else {
                this.optionsData = []
              }
            }
            // TODO: УБРАТЬ getOption emit??
            this.$emit('getOption', this.optionsData)
          })
          .catch(err => console.error(err))
      }
    },
    onSelectTag (data) {
      if (this.taggable) {
        this.$emit('input', data)
      }
    },
    onSelectResult (data) {
      if (!this.taggable) {
        this.$emit('input', data)
        this.$emit('change', data)

        if (this.storage && this.storage.hasOwnProperty('store') && this.storage.hasOwnProperty('name') && this.storage.store && this.storage.name) {
          localStorage.setItem(this.storage.name, JSON.stringify(data))
        }
      }

      if (this.disabledOpen) {
        this.optionsData = []
      }
    },
    onRemoveResult () {
      if (!this.taggable) {
        this.$emit('input', '')
        this.$emit('select', '')
      }
    },
    debounceSearch:
      debounce(function (data) {
        // Баг: после выбора значения, компонент делает еще 1 запрос с пустым значением.
        // Написал обработку для испралвения бага. Проверил на разделе Базы. Работает корректно во всех случаях
        // 09.12.2019 г.
        if (!data && !this.taggable) return

        this.searchChange(data)
      }, 200),
    searchChange (data) {
      if (this.disabledOpen && !data) return

      if (this.url) {
        let dataSend = { [this.querySearchName]: data || '' }

        if (this.urlData) {
          dataSend = { ...this.urlData, ...dataSend }
        }

        ApiService[this.requestMethod](this.url, dataSend)
          .then(({ data }) => {
            if (typeof data === 'string') {
              this.optionsData = []

              return
            }

            if (data && Array.isArray(data) && data.length) {
              const hasSingleResultFalseValues = data.length < 2 && (!data[0][this.label] || !data[0][this.trackBy])
              const hasArrayFalseItems = data.some(value => !value)

              this.optionsData = hasSingleResultFalseValues || hasArrayFalseItems ? [] : data
            } else {
              this.optionsData = []
            }
          })
          .catch(err => console.error(err))
      } else {
        this.$emit('search-change', data)
      }
    }
  }
}
</script>

<style lang="scss">
.input-select-autocomplete {
  .multiselect__single {
    padding-right: 27px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .multiselect__tags {
    min-width: 90px;
    min-height: 35px;
    background-color: #fff;
    border-radius: 5px;
  }

  .multiselect__spinner {
    z-index: 2;
    top: 2px;
    right: 2px;
    width: 30px;
    height: 30px;
  }

  .bootstrap-hover-valid {
    .multiselect__tags {
      box-shadow: 0 0 0 0.2rem rgba(98, 168, 234, 0.25);
    }
  }

  .bootstrap-hover-invalid {
    .multiselect__tags {
      box-shadow: 0 0 0 0.2rem rgba(249, 104, 104, 0.25);
    }
  }

  & .bootstrap-control-sm {
    .multiselect__tags {
      height: 31px;
      min-height: 31px;
    }
  }
}
</style>
