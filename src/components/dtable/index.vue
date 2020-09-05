<template>
  <div>
    <!--Поля поиска, настройки (table header)-->
    <div class="form-row mb-2">
      <dtable-search-constructor
        v-for="(input, inputIndex) in searchFields"
        :key="inputIndex"
        :settings="input"
        :value-slot="input.type === 'slot' ? input.value : undefined"
        @startFilter="onFilterTable"
        @onClick="$emit($event)"
      >
        <template v-if="input.type === 'slot'">
          <slot :name="input.name"/>
        </template>
      </dtable-search-constructor>
    </div>
    <div class="row">
      <div class="col">
        <div class="dt dt__wrap">
          <div class="dt__cont">
            <spinner-cover
              v-if="isDtLoading"
              :size="48"
            />
            <!-- Таблица -->
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <template v-for="(field, fieldIndex) in tableFields">
                    <th
                      v-if="field.visible"
                      :key="fieldIndex"
                      :style="{width: field.width}"
                      :class="{'dt--pointer': field.sortField}"
                      @click="sortColumn(field, $event)"
                    >
                      <div
                        class="dt__cell"
                        :class="{ 'dt--head': field.sortField }"
                      >
                        {{ field.title }}
                        <span
                          v-if="field.sortField"
                          class="dt--title-icon"
                        >
                          <font-awesome-icon
                            v-if="sortDirection === 'asc' && sortField === field.sortField"
                            icon="sort-up"
                          />
                          <font-awesome-icon
                            v-else-if="sortDirection === 'desc' && sortField === field.sortField"
                            icon="sort-down"
                          />
                          <font-awesome-icon
                            v-else
                            icon="sort"
                          />
                        </span>
                      </div>
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <template v-if="isDataExist">
                  <tr
                    v-for="(item, rowIndex) in tableData"
                    ref="tableRow"
                    :key="item.id || rowIndex"
                    class="cursor-pointer"
                    @click="onRowClicked(item)"
                    @dblclick.stop="onRowDoubleClicked(item)"
                  >
                    <template v-for="(field, fieldIndex) in tableFields">
                      <template v-if="field.visible">
                        <td :key="fieldIndex">
                          <template v-if="extractName(field.name) === '__slot'">
                            <slot
                              :name="extractArgs(field.name)"
                              :row-index="rowIndex"
                              :row-data="item"
                              :row-field="field.sortField"
                            />
                          </template>
                          <dtable-cell
                            v-else
                            :field="field"
                            :data="item"
                            :pagination="tablePagination"
                            :row-index="rowIndex"
                          />
                        </td>
                      </template>
                    </template>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td
                      :colspan="fields.length"
                      class="text-center"
                    >
                      Записи отсутствуют
                    </td>
                  </tr>
                </template>
              </tbody>
              <tfoot>
                <slot
                  name="tableFooter"
                  :fields="tableFields"
                  :table="tablePagination"
                />
              </tfoot>
            </table>
          </div>
          <!-- Пагинация для таблицы -->
          <div
            v-if="isDataExist"
            class="flex justify-content-between"
          >
            <div class="flex align-items-stretch">
              <dtable-pagination
                ref="pagination"
                class="mr-2"
                @dtable-pagination:change-page="onChangePage"
              />
              <!--Кнопка НАСТРОЙКИ Дататейбла-->
              <dtable-btn-settings
                :visible-fields="fieldsSettingsArr"
                :per-page="currentPerPage"
                position="right"
                @onChangePerPage="handlePerPage"
                @onToggleVisible="toggleVisible"
              />
            </div>
            <dtable-pagination-info ref="paginationInfo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '@/utils/api.service'
import dtableCell from '@/components/dtable/_components/dtableCell'
import dtablePagination from '@/components/dtable/_components/dtablePagination'
import dtablePaginationInfo from '@/components/dtable/_components/dtablePaginationInfo'
import dtableSearchConstructor from '@/components/dtable/_components/dtableSearchConstructor'
import dtableBtnSettings from '@/components/dtable/_components/dtableBtnSettings'

export default {
  components: {
    dtableCell,
    dtablePagination,
    dtablePaginationInfo,
    dtableSearchConstructor,
    dtableBtnSettings,
    spinnerCover: () => import(/* webpackChunkName: "spinnerCover" */ '@/components/spinner/spinner-cover')
  },
  props: {
    /*
    *apiUrl- принимает сервевер бэкенда для загрузки данных
    */
    apiUrl: {
      type: String,
      default: ''
    },
    /*
    *defaultSort - Колонка сортировки по умолчанию
    */
    defaultSort: {
      type: Object,
      default: null
    },
    /*
    * fields - Какие колонки будут у таблицы ? Благодаря данному props компонент сопоставляет
    * загруженные данные по apiUrl с колонками таблицы. Fields представляет собой массив объектов,
    * где каждый объект имеет след структуру:
    * name (Название колонки. При загрузке данных по api, данные, ключ которых == name, вставляются в данную колонку),
    * title (Название колонки, которое показывается пользователю в браузере),
    * titleClass (),
    * dataClass:  ###,
    * callback:  ###,
    * visible:  ###
    */
    fields: {
      type: Array,
      required: true
    },
    fetchData: {
      type: Object,
      default: null
    },
    name: {
      /*
      * Если передано это свойство, данные по колонкам и perPage будут сохранены в LocalStorage
      * */
      type: String,
      default: ''
    },
    perPage: {
      type: Number,
      default: 10
    },
    extraRequest: {
      type: Object,
      default: undefined
    },
    searchFields: {
      type: Array,
      default: () => {
        return [{
          name: 'global',
          type: 'input',
          placeholder: 'Поиск',
          data: {},
          default: ''
        }]
      }
    }
  },
  data () {
    return {
      // Таблица и пагинация
      currentPage: 1,
      currentPerPage: this.perPage,
      dataFormObj: this.fetchData,
      isDtLoading: false,
      tableData: null,
      tablePagination: null,
      sortField: '',
      sortDirection: '',
      searchArray: {},
      tableFields: [],
      // fieldsSettingsArr используется для компонента dtableBtnSettings - список колонок, которые МОЖНО скрывать
      fieldsSettingsArr: this.fields
        .filter(field => field.hasOwnProperty('visible'))
        .map(item => {
          return {
            name: item.name,
            title: item.title,
            visible: item.visible
          }
        })
    }
  },
  computed: {
    isDataExist () {
      return !!this.tableData && this.tableData.length
    },
    storageName () {
      return 'datatable-' + this.name
    }
  },
  watch: {
    fields: {
      deep: true,
      handler () {
        this.normalizeFields()
      }
    }
  },
  mounted () {
    if (this.defaultSort && this.defaultSort.hasOwnProperty('field') && this.defaultSort.hasOwnProperty('direction')) {
      this.sortField = this.defaultSort.field
      this.sortDirection = this.defaultSort.direction
    }
    /*
    * Если у фильтра в searchFields задано значение по умолчанию default, добавляем его (в default обязательно должно быть поле value)
    * */
    this.searchFields.forEach(field => {
      if (field.hasOwnProperty('default') && Object.entries(field.default).length && field.default.value) {
        this.$set(this.searchArray, field.name, field.default.value)
      }
    })

    this.normalizeFields()
    this.fetchTableData()
  },
  methods: {
    extractArgs (string) {
      return string.split(':')[1]
    },
    extractName (string) {
      return string.split(':')[0].trim()
    },
    handlePerPage (value) {
      /*
      * При смене количества строк на странице:
      * 1) сохраняем в LocalStorage (setLocalStorage)
      * 2) Подтягиваем данные с сервера (fetchTableData)
      * */
      this.currentPerPage = value

      this.setLocalStorage()
      this.fetchTableData()
    },
    handleLocalStorage () {
      /*
      * 1) Проверяем, есть ли имя таблицы this.name. Если нету, то прекращаем выполнение функции
      * 2) Если имя передано, проверяем LocalStorage на наличие имени значения this.storageName
      * 3) Переписываем значения visible в элементах массива this.tableFields
      * */
      if (!this.name) return

      if (!localStorage.getItem(this.storageName)) {
        this.setLocalStorage()
      } else {
        const data = JSON.parse(localStorage.getItem(this.storageName))

        if (!data.hasOwnProperty('fields') || !data.hasOwnProperty('perPage')) {
          localStorage.removeItem(this.storageName)
          return
        }

        this.fieldsSettingsArr = data.fields
        this.currentPerPage = data.perPage
      }

      this.tableFields.forEach(item => {
        this.fieldsSettingsArr.forEach(field => {
          if (field.name === item.name) {
            item.visible = field.visible
          }
        })
      })
    },
    isSpecialField (fieldName) {
      return fieldName.slice(0, 2) === '__'
    },
    normalizeFields () {
      if (typeof (this.fields) === 'undefined') {
        console.error('Нужно передать свойство "fields".')
        return
      }
      this.tableFields = []
      let obj

      this.fields.forEach((field) => {
        obj = (typeof (field) === 'string')
          ? {
            name: field,
            title: this.setTitle(field),
            titleClass: '',
            dataClass: '',
            callback: null,
            visible: true
          }
          : {
            name: field.name,
            width: field.width,
            title: (field.title === undefined) ? this.setTitle(field.name) : field.title,
            sortField: field.sortField,
            titleClass: (field.titleClass === undefined) ? '' : field.titleClass,
            dataClass: (field.dataClass === undefined) ? '' : field.dataClass,
            callback: (field.callback === undefined) ? '' : field.callback,
            visible: (field.visible === undefined) ? true : field.visible
          }
        this.tableFields.push(obj)
      })

      this.handleLocalStorage()
    },
    fetchTableData (params) {
      let data = {}

      data = params || {
        per_page: this.currentPerPage,
        current_page: this.currentPage
      }

      Object.entries(this.searchArray).forEach(([ key, value ]) => {
        if (value !== '') {
          data[key] = value
        }
      })

      if (this.sortField && this.sortDirection) {
        data.sort = this.sortField
        data.sort_dir = this.sortDirection
      }

      if (this.dataFormObj) {
        Object.entries(this.dataFormObj).forEach(([ key, value ]) => {
          if (typeof key === 'object' && Object.keys(value).length) {
            Object.entries(value).forEach(([ valueKey, valueValue ]) => {
              data[valueKey] = valueValue
            })
          } else {
            data[key] = value
          }
        })
      }
      if (this.extraRequest) {
        Object.entries(this.extraRequest).forEach(([ key, value ]) => {
          data[key] = value
        })
      }
      this.isDtLoading = true

      ApiService.get(this.apiUrl, data)
        .then(({ data }) => {
          this.setData(data)
        })
        .then(() => {
          if (!this.isDataExist) return

          this.onPaginationData(this.tablePagination)
        })
        .finally(() => { this.isDtLoading = false })
    },
    onChangePage (page) {
      // Пагинатор передает эмитом номер страницы или "следующая"/"предыдущая". Номер страницы мы отправляем на сервер для получения данных.
      if (page === 'prev') {
        this.currentPage = this.tablePagination.current_page - 1
      } else if (page === 'next') {
        this.currentPage = this.tablePagination.current_page + 1
      } else {
        this.currentPage = page
      }

      this.fetchTableData()
    },
    onFilterTable (filter) {
      if (filter.hasOwnProperty('isMultiple') && filter.isMultiple) {
        this.searchArray[filter.name] = filter.value.join(',')
      } else {
        this.searchArray[filter.name] = filter.value
      }

      const data = {
        per_page: this.currentPerPage,
        current_page: 1
      }

      Object.entries(this.searchArray).forEach(([ key, value ]) => {
        if (value !== '') {
          data[key] = value
        }
      })

      this.$emit('onSearchChange', this.searchArray)

      this.fetchTableData(data)
    },
    onPaginationData (paginationData) {
      // передаем общую инфомрацию таблицы в пагинацию и информацию пагинации
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onRowClicked (data) {
      this.$emit('rowClicked', data)
    },
    onRowDoubleClicked (data) {
      this.$emit('rowDoubleClicked', data)
    },
    setData (data) {
      if (data === null || typeof (data) === 'undefined') return

      this.tablePagination = data
      this.tableData = data.data
    },
    setLocalStorage () {
      /*
      * Сохраняем данные в LocalStorage, только если this.name - true
      * */
      if (this.name) {
        localStorage.setItem(this.storageName, JSON.stringify({
          perPage: this.currentPerPage,
          fields: this.fieldsSettingsArr
        }))
      }
    },
    settingFetchData (data) {
      // Через эту функцию извне передаются заголовки, после чего мы вызываем функцию запроса
      if (data === null || typeof (data) === 'undefined') return

      this.dataFormObj = data
      this.fetchTableData()
    },
    setTitle (str) {
      if (this.isSpecialField(str)) return ''

      return this.titleCase(str)
    },
    sortColumn (s) {
      if (s === null || s.sortField === undefined || typeof (s) === 'undefined') return

      if (s.sortField === this.sortField) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      }

      this.sortField = s.sortField

      this.fetchTableData()
    },
    titleCase (str) {
      return str.replace(/\w+/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    },
    toggleVisible (field, fieldIndex) {
      /*
      * скрываем/отображаем колонку таблицы
      * 1) меняем fieldsSettingsArr[fieldIndex].visible для отображения Иконки галки/крестика
      * 2) tableFields.forEach - для фактического скрытия/отображения колонки в таблице
      * */
      this.fieldsSettingsArr[fieldIndex].visible = !field.visible
      this.tableFields.forEach(item => {
        if (field.name === item.name) {
          item.visible = !item.visible
        }
      })

      this.setLocalStorage()
    }
  }
}
</script>
