<!--ВНИМАНИЕ функционал(кнопки) которые пока не работают скрыты по временному параметру manualHide-->
<template>
  <div class="dropdown-filter dropdown-filter__wrap">
    <!--Шапки фильтра, Бейджики, основной поиск-->
    <div class="dropdown-filter__settings">
      <!--Название фильтра-->
      <!--Отображается, когда фильтр сохранен и есть название-->
      <div
        v-if="badgesFilter"
        class="one-item dropdown-filter-active_badge"
      >
        {{ badgesFilter }}
        <font-awesome-icon
          icon="times"
          size="sm"
          class="search-close"
          @click="onClearFilter"
        />
      </div>

      <!--Список выбранных фильтров (не более 3х)-->
      <transition-group
        name="list"
        class="list"
        tag="div"
      >
        <template v-for="(params, paramsIndex) in badges">
          <template v-if="paramsIndex < 2">
            <div
              :key="params.key"
              class="list-item dropdown-filter-active_badge"
            >
              {{ params.value }}
              <font-awesome-icon
                icon="times"
                size="sm"
                class="search-close"
                @click="onClearSelected(params.key)"
              />
            </div>
          </template>
          <template v-if="paramsIndex === 2">
            <div
              :key="params.key"
              class="list-item dropdown-filter-active_badge"
            >
              и еще {{ badges.length - 2 }}
              <font-awesome-icon
                icon="times"
                size="sm"
                class="search-close"
                @click="onClearSelected(badges, 2)"
              />
            </div>
          </template>
        </template>
      </transition-group>

      <!--Основной инпут поиска global-->
      <input
        v-model.trim="searchData"
        class="dropdown-filter-form form-control"
        placeholder="Поиск"
        @click="test"
        @keyup="addInputClear"
        @input="debounceFind"
      >
      <!--Лупа поиска global-->
      <div
        v-if="!manualHide"
        class="dropdown-filter-search"
      >
        <font-awesome-icon icon="search" />
        <span class="pl-1">Поиск</span>
      </div>
      <!--Крестик очистки глобального поиска global-->
      <div
        class="dropdown-filter-close"
        :class="[{'close-visible': formInputActive}]"
      >
        <font-awesome-icon
          icon="times"
          @click="clear"
        />
      </div>
    </div>

    <!--Выпадающий список фильтров-->
    <div
      v-if="activeMenu"
      v-on-clickaway="onAddsDropdownMenu"
      class="dropdown-filter-menu"
      :class="{ 'menu-active': activeMenu }"
    >
      <div class="dropdown-filter-menu-list">
        <template
          v-if="edit"
          class="width-100"
        >
          <div class="width-100">
            <span class="list-head">Фильтры</span>
            <div
              v-for="filter in editFilterFields"
              :key="filter.id"
              class="dropdown-filter-menu-stroke"
            >
              <template v-if="indexEditFilter === filter.id">
                <span
                  class="list-head edit-input"
                >
                  <input
                    v-model="editFilterData"
                    class="form-control dropdown-filter-menu-input"
                  >
                </span>
              </template>
              <template v-else>
                <span
                  :class="{'span-selected': filter.id === selectedFilter.id}"
                  @click="onSelectFilter(filter, true)"
                >
                  {{ filter.name }}
                </span>
              </template>
              <font-awesome-icon
                class="dropdown-filter-menu-icon"
                icon="edit"
                @click="onEditInputFilter(filter, true)"
              />
              <font-awesome-icon
                class="dropdown-filter-menu-icon"
                icon="trash-alt"
                @click="onDelInputFilter(filter.id)"
              />
            </div>
          </div>
          <div class="filter-list-bottom-menu">
            <div class="filter-list-bottom-menu-content">
              <span
                class="filter-list-bottom-menu-canel"
                @click="onOpenModalReturn"
              >
                <font-awesome-icon
                  icon="angle-left"
                  fixed-width
                  class="filter-list-bottom-menu-add"
                />
                По умолчанию
              </span>
              <font-awesome-icon
                icon="cogs"
                fixed-width
                class="filter-list-bottom-menu-add"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div
            v-if="filtres"
            class="filter-flex"
          >
            <div class="width-100">
              <span class="list-head">Фильтры</span>
              <div
                v-for="filter in filterFields"
                :key="filter.id"
                class="dropdown-filter-menu-stroke"
              >
                <span
                  :class="{'span-selected': filter.id === selectedFilter.id}"
                  @click="onSelectFilter(filter)"
                >
                  {{ filter.name }}
                </span>
              </div>
              <transition name="one">
                <template v-if="addNewInputs">
                  <span
                    class="list-head"
                  >
                    <input
                      v-model="addFilterData"
                      class="form-control dropdown-filter-menu-input"
                    >
                  </span>
                </template>
              </transition>
            </div>
            <div
              v-if="!manualHide"
              class="filter-list-bottom-menu"
            >
              <div class="filter-list-bottom-menu-content">
                <span
                  v-if="addNewInputs"
                  class="filter-list-bottom-menu-canel"
                  @click="onCanelNewFilter"
                >
                  <font-awesome-icon
                    icon="angle-left"
                    fixed-width
                    class="filter-list-bottom-menu-add"
                  />
                  Отменить
                </span>
                <span
                  v-else
                  class="flexbox"
                  @click="onOpenNewFilter"
                >
                  <font-awesome-icon
                    icon="plus"
                    fixed-width
                    class="filter-list-bottom-menu-add"
                  />
                  <span class="save-nowrap">Сохранить фильтр</span>
                </span>
                <span class="filter-list-bottom-menu-canel">
                  <font-awesome-icon
                    icon="cogs"
                    fixed-width
                    class="filter-list-bottom-menu-add"
                    @click="onEditFilter"
                  />
                </span>
              </div>
            </div>
          </div>
          <div
            v-else
            class="checkboxes"
          >
            <template v-for="(field, name) in fields">
              <checkbox
                :key="name"
                v-model="formDataCheckbox[name]"
                :input-id="`filter-modal-checkbox-${name}`"
                class="checkbox-flex"
              >
                {{ field.label }}
              </checkbox>
            </template>
            <app-btn
              class="mt-3 mb-3"
              @click="closeCheckboxes"
            >
              Отмена
            </app-btn>
          </div>
        </template>
      </div>
      <div class="dropdown-filter-menu-settings">
        <div
          ref="menuBottom"
          class="dropdown-filter-menu-settings__filterItem"
        >
          <div class="filterItem-flex">
            <template v-for="field in ui">
              <filter-field
                :ref="field"
                :key="field"
                v-model="formDataInputs[field]"
                class="field-item"
                :field-name="field"
                :settings="fields[field]"
              />
            </template>
          </div>
          <!--Дополнительный кастомный элемент поиска для humanresources-->
          <slot name="custom-search-field" />

          <div
            v-if="!manualHide"
            class="dropdown-settings-bottom-menu-add"
          >
            <span
              class="add-blue"
              @click="onAddInputsMenu"
            >
              Добавить поле
            </span>
          </div>
        </div>
        <div class="dropdown-settings-bottom-menu">
          <div
            v-if="edit"
            class="dropdown-filter-menu-settings__buttons"
          >
            <app-btn
              color="primary"
              @click="onSaveEditFilter"
            >
              <font-awesome-icon
                icon="save"
                fixed-width
              />
              Сохранить
            </app-btn>
            <app-btn
              outline
              color="gray"
              class="ml-3"
              @click="onCanelEditFilter"
            >
              Отмена
            </app-btn>
          </div>
          <div
            v-else-if="addNewInputs"
            class="dropdown-filter-menu-settings__buttons"
          >
            <app-btn
              color="primary"
              @click="onSaveNewFilter"
            >
              <font-awesome-icon
                icon="search"
                fixed-width
              />
              Сохранить
            </app-btn>
            <app-btn
              outline
              color="gray"
              class="ml-3"
              @click="onCanelNewFilter"
            >
              Отмена
            </app-btn>
          </div>
          <div
            v-else
            class="dropdown-filter-menu-settings__buttons"
          >
            <app-btn
              color="primary"
              @click="find"
            >
              <font-awesome-icon
                icon="search"
                fixed-width
              />
              Найти
            </app-btn>
            <app-btn
              outline
              color="gray"
              class="ml-3"
              @click="clear"
            >
              Сбросить
            </app-btn>
          </div>
        </div>
      </div>
    </div>

    <!--Какое-то модальное окно. Пока не активно, на будущее можно задействовать или удалить-->
    <transition name="one">
      <div
        v-if="modalSave"
        class="cancel-filter-modal"
      >
        <span>{{ modalSaveText }}</span>
        <div class="dropdown-filter-menu-settings__buttons">
          <app-btn
            color="primary"
            @click="onCloseModalSave"
          >
            Понятно
          </app-btn>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import checkbox from '@/components/checkbox/checkbox'
import filterField from '@/components/filter/filter-field'
export default {
  components: {
    filterField,
    checkbox
  },
  props: {
    default: {
      type: Object,
      default: () => ({})
    },
    uiAction: {
      type: Array,
      default: () => []
    },
    filterFieldsAction: {
      type: Array,
      default: () => []
    },
    fieldsAction: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      manualHide: true, // Временный параметр для скрытия не работающего функционала (удалить после доработок)

      clientHeightMenu: 0,

      activeMenu: false,
      addInputsMenu: false,
      addModalMenu: false,
      editFilter: false,
      edit: false,
      addNewInputs: false,
      modalReturn: false,
      modalSave: false,
      formInputActive: false,
      filtres: true,

      modalSaveText: '',
      addFilterData: '',

      indexEditFilter: '',
      editFilterData: '',
      editFilterFields: [],

      searchData: '',
      badgesFilter: '',
      badges: [],
      selectedFilter: '',

      formDataCheckbox: {},
      formDataInputs: {},
      settingsInputs: {},

      fields: this.fieldsAction,
      ui: this.uiAction,
      filterFields: this.filterFieldsAction
    }
  },
  watch: {
    formDataCheckbox: {
      handler () {
        this.handleFormDataCheckbox()
      },
      deep: true
    },
    editFilterData () {
      this.handlerEditInputFilter()
    },
    default () {
      this.render()
    },
    uiAction (newValue) {
      this.ui = newValue
    },
    filterFieldsAction: {
      handler () {
        this.filterFields = this.filterFieldsAction
      },
      deep: true
    },
    fieldsAction: {
      handler () {
        this.fields = this.fieldsAction
      },
      deep: true
    }
  },
  mounted () {
    this.render()
    this.find()
  },
  methods: {
    render () {
      Object.keys(this.fields).forEach(key => {
        this.$set(this.formDataCheckbox, key, false)
        this.$set(this.formDataInputs, key, this.default[key] !== undefined ? this.default[key] : '')
      })
      this.ui.forEach(item => {
        if (this.formDataCheckbox.hasOwnProperty(item)) {
          this.formDataCheckbox[item] = true
        }
      })
    },
    test () {
      this.activeMenu = true
    },
    makeFormActive () {
      this.formInputActive = true
    },
    onOpenModalSave (text) {
      this.modalSave = true
      this.modalSaveText = text
    },
    onCloseModalSave () {
      this.modalSave = false
      this.modalSaveText = ''
    },
    onOpenModalReturn () {
      this.modalReturn = true
    },
    onCloseModalReturn () {
      this.modalReturn = false
    },
    onOpenNewFilter () {
      this.edit = false
      this.addNewInputs = true
      this.addFilterData = ''
    },
    onSaveNewFilter (ignore) {
      let inputsValues = this.ui.some(item => this.formDataInputs[item] !== '')
      if (this.addFilterData !== '' && this.ui.length > 0 && inputsValues) {
        let newValue = {}
        this.ui.forEach(item => {
          if (this.formDataInputs.hasOwnProperty(item) && this.formDataInputs[item] !== '' && this.formDataInputs[item] !== undefined) {
            newValue[item] = this.formDataInputs[item]
          }
        })
        let maxID = Math.max.apply(this, this.filterFields.map(item => {
          return item.id
        })) + 1

        let newFilter = {
          id: maxID,
          name: this.addFilterData,
          value: newValue
        }
        this.$set(this.filterFields, this.filterFields.length, newFilter)
        this.onSelectFilter(newFilter)
        this.onCanelNewFilter()
      } else {
        let text = 'У сохраняемого фильтра '
        if (this.addFilterData === '') {
          text += 'должно быть название'
          this.ui.length < 1 || !inputsValues ? text += ', а так-же ' : text += '.'
        }
        if (this.ui.length < 1) {
          text += 'должны быть поля фильтрации'
          !inputsValues ? text += ' и ' : text += '.'
        }
        if (!inputsValues) {
          text += 'хотя-бы одно поле должно быть заполнено.'
        }
        this.onOpenModalSave(text)
      }
    },
    onCanelNewFilter () {
      this.addNewInputs = false
      this.addFilterData = ''
    },
    onEditFilter () {
      this.onCanelNewFilter()
      this.editFilterFields = []
      this.filterFields.forEach(item => {
        this.editFilterFields.push(Object.assign({}, item))
      })
      this.edit = true
    },
    onCanelEditFilter () {
      this.onCloseModalReturn()
      this.edit = false
      this.editFilterFields = []
    },
    onSaveEditFilter () {
      let findIndex = this.filterFields.findIndex(item => item.id === this.selectedFilter.id)
      Object.keys(this.formDataInputs).forEach(key => {
        if (this.formDataInputs[key] !== undefined && this.formDataInputs[key] !== '' && this.formDataInputs[key] !== null) {
          this.filterFields[findIndex].value[key] = this.formDataInputs[key]
        }
      })
      this.filterFields = []
      this.editFilterFields.forEach(item => {
        this.filterFields.push(Object.assign({}, item))
      })
      this.handlerSelectedFilter(this.selectedFilter, true)
      this.onCanelEditFilter()
    },
    onEditInputFilter (filter) {
      this.onSelectFilter(filter, true)
      this.indexEditFilter = filter.id
      this.editFilterData = filter.name
    },
    onDelInputFilter (filterID) {
      let findIndex = this.editFilterFields.findIndex(item => item.id === filterID)
      this.$delete(this.editFilterFields, findIndex)
      this.clear()
    },
    onCanelEditInputFilter () {
      this.indexEditFilter = ''
    },
    onOpenActiveMenu (bool) {
      this.activeMenu = bool
    },
    onAddInputsMenu () {
      this.addInputsMenu = true
      this.clientHeightMenu = this.$refs.menuBottom.clientHeight
      this.filtres = false
    },
    closeCheckboxes () {
      this.filtres = true
    },
    onAddsDropdownMenu () {
      this.activeMenu = false
    },
    onCloseInputsMenu () {
      this.addInputsMenu = false
    },
    onSelectFilter (filter, edit) {
      this.onCanelNewFilter()
      this.onCanelEditInputFilter()
      this.handlerSelectedFilter(filter, true)

      if (!edit) {
        this.find()
      }
    },
    onClearFilter () {
      this.handlerSelectedFilter()
      this.find()
    },
    onClearSelected (key, indexStart) {
      if (Array.isArray(key)) {
        key.forEach((item, index) => {
          if (index >= indexStart) {
            this.formDataInputs[item.key] = ''
          }
        })
      } else {
        this.formDataInputs[key] = ''
      }
      this.handlerFormDataInputs()
      this.find()
    },
    addInputClear () {
      this.formInputActive = true
    },
    handlerEditInputFilter () {
      let findIndex = this.editFilterFields.findIndex(item => item.id === this.selectedFilter.id)
      if (findIndex !== undefined) {
        this.editFilterFields[findIndex].name = this.editFilterData
      }
    },
    handleFormDataCheckbox () {
      Object.keys(this.formDataCheckbox).forEach(key => {
        if (this.formDataCheckbox[key] === true) {
          this.actionUIInput(key, true)
        } else if (this.formDataCheckbox[key] === false) {
          this.actionUIInput(key, false)
          this.formDataInputs[key] = ''
        }
      })
      if (this.selectedFilter.value && Object.entries(this.selectedFilter.value).some(([key, value]) => {
        return this.formDataCheckbox[key] === false
      }) === true) {
        this.selectedFilter = ''
        this.badgesFilter = ''
      }
      this.handlerFormDataInputs()
    },
    handlerSelectedFilter (newFilter, checkOld) {
      if (this.selectedFilter.value) {
        if (checkOld) {
          Object.entries(this.selectedFilter.value).forEach(([key, value]) => {
            this.formDataInputs[key] = ''
            this.formDataCheckbox[key] = Object.entries(newFilter.value).find(([keyFind, valueFind]) => {
              return keyFind === key
            }) !== undefined
          })
        } else {
          Object.entries(this.selectedFilter.value).forEach(([key, value]) => {
            this.formDataInputs[key] = ''
            this.formDataCheckbox[key] = false
          })
        }
        this.selectedFilter = ''
      }
      if (newFilter) {
        this.selectedFilter = newFilter
        if (this.selectedFilter.value) {
          Object.entries(this.selectedFilter.value).forEach(([key, value]) => {
            this.formDataCheckbox[key] = true
            this.formDataInputs[key] = value
          })
        }
      }
      if (this.selectedFilter.name) {
        this.badgesFilter = this.selectedFilter.name
      } else {
        this.badgesFilter = ''
      }
    },
    handlerFormDataInputs () {
      this.badges = []

      Object.entries(this.formDataInputs).forEach(([key, value]) => {
        if (!value) return

        if (!(this.selectedFilter.value && this.selectedFilter.value.hasOwnProperty(key))) {
          let valueBadges = ''

          if (this.fields[key].type === 'select') {
            const hasData = this.fields[key].data.some(item => item.id === value)

            if (hasData) {
              const findValue = this.fields[key].data.find(item => item.id === value)

              // TODO: исправить, ключ name может быть динамическим
              valueBadges = findValue.name
            }
          } else if (this.fields[key].type === 'multiselect') {
            const fieldKey = this.fields[key].typeValue

            // TODO: костыль от Егора 26.05.20
            /*
            * Описание костыля. Есть массив объектов Бейджиков (тегов), нам нужно вывести их названия
            * мы проходимся по массиву, берем первое значение и длину массив и соединяем с троку
            * */
            if (Array.isArray(value) && value.length) {
              const firstValueElement = value[0][fieldKey]
              const arrayItemsCount = value.length > 2 ? ` и еще +${value.length - 1}` : ''

              valueBadges = firstValueElement + arrayItemsCount
            } else {
              valueBadges = value[fieldKey]
            }
          } else if (this.fields[key].type === 'checkboxSwitch') {
            valueBadges = this.fields[key].placeholder || this.fields[key].label
          } else {
            valueBadges = value
          }

          const label = this.fields[key].label

          this.badges.push({
            key,
            value: valueBadges,
            label
          })
        }
      })
    },
    actionUIInput (key, add) {
      if (add === true) {
        if (!this.ui.find(item => item === key)) {
          this.$set(this.ui, this.ui.length, key)
        }
      } else if (add === false) {
        let index = this.ui.findIndex(item => item === key)
        if (index !== undefined) { this.$delete(this.ui, index) }
      }
    },
    setForm (key, value, fullValue = '', type) {
      if (this.fields.hasOwnProperty(key)) {
        this.$set(this.innerForm, key, {
          name: key,
          type,
          value: fullValue
        })
      }
    },
    generateFormData () {
      let formData = {}
      Object.entries(this.formDataInputs).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          let findSettings = this.fields[key]
          if (findSettings !== undefined && !!findSettings.typeKey) {
            if (Array.isArray(value)) {
              formData[key] = value.map(item => item[findSettings.typeKey])
            } else {
              formData[key] = value[findSettings.typeKey]
            }
          } else {
            formData[key] = value
          }
        }
      })
      formData['global'] = this.searchData
      return formData
    },
    checkValuesFilter () {
      if (this.selectedFilter.value) {
        let checkFilter = Object.keys(this.selectedFilter.value).every(key => {
          return this.formDataInputs.hasOwnProperty(key) && this.selectedFilter.value[key] === this.formDataInputs[key]
        })
        if (!checkFilter) {
          this.selectedFilter = ''
          this.badgesFilter = ''
        }
      }
    },
    clear () {
      this.searchData = ''
      Object.keys(this.formDataInputs).forEach(key => {
        this.formDataInputs[key] = ''
      })
      this.handlerSelectedFilter()
      this.handlerFormDataInputs()
      this.formInputActive = false
      this.find()
    },
    find () {
      this.checkValuesFilter()
      this.handlerFormDataInputs()
      this.$emit('input', this.generateFormData())
      this.onCloseInputsMenu()
      this.onOpenActiveMenu(false)
    },
    debounceFind:
      debounce(function () {
        this.find()
      }, 1000)
  }
}
</script>

<style lang="scss">
  $fil-white: white;
  $fil-dark-gray: #76838f;
  $fil-light-gray: #ececec;
  $fil-blue: #62a8ea;

  .dropdown-filter {
    &__wrap {
      position: relative;
    }

    &__settings {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
    }

    .input-select-autocomplete {
      max-width: 535px;
    }

    .multiselect__input {
      padding: 0;
    }

    &-search {
      margin-left: 5px;
      display: flex;
      width: 85px;
      justify-content: center;
      align-items: center;
      border: 1px solid #dee2e6;
      border-radius: 0.25rem;
      transition: 0.2s;

      &:hover {
        background-color: #e6e6e6;
        cursor: pointer;
      }
    }

    &-close {
      position: absolute;
      // right: 105px;
      right: 15px;
      margin-left: 5px;
      display: flex;
      visibility: hidden;
      width: 40px;
      height: 100%;
      justify-content: center;
      align-items: center;

      &:hover {
        cursor: pointer;
      }
    }

    &-form_modal {
      position: absolute;
      z-index: 10;
      top: 275px;
      padding: 1rem;
      display: flex;
      overflow-x: hidden;
      overflow-y: auto;
      width: 530px;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      background-color: $fil-white;
      box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.08);
      align-content: flex-start;
    }

    &-active_badge {
      position: relative;
      margin-right: 5px;
      padding: 5px 25px 5px 10px;
      overflow: hidden;
      width: 100%;
      min-width: 150px;
      max-width: 200px;
      height: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #76838f;
      background-color: transparent;
      border: 1px solid #e4eaec;
      border-radius: 0.25rem;
    }

    &-menu {
      position: absolute;
      z-index: 100;
      margin: 5px 0;
      display: flex;
      visibility: hidden;
      width: 100%;
      opacity: 0;
      background: $fil-white;
      border-radius: 5px;
      box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.14);
      transition: 0.2s;

      &-stroke {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8rem;
        border-bottom: 1px solid $fil-light-gray;
      }

      &-icon {
        margin: 0 2px;

        &:hover {
          color: darken(white, 90%);
          transition: 0.2s;
          cursor: pointer;
        }
      }

      &-input {
        font-size: 0.75em;
      }

      input,
      select {
        padding: 0.375rem 1.5rem 0.375rem 0.75rem;
        width: 100%;
        height: 35px;
        font-size: 0.8rem;
        line-height: 1.5;
        font-weight: 400;
        color: $fil-dark-gray;
        background-color: $fil-white;
        background-clip: padding-box;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        &:focus {
          border-color: #d2e6f9;
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba(98, 168, 234, 0.25);
        }
      }

      &-settings {
        z-index: 1;
        padding: 15px 0;
        display: flex;
        min-height: 250px;
        flex: 60%;
        flex-wrap: wrap;
        align-items: stretch;

        &__filterItem {
          margin-bottom: 20px;
          padding: 0 20px;
          display: flex;
          flex: 100%;
        }

        &__buttons {
          display: flex;
          flex: 100%;
          justify-content: center;
          align-items: flex-end;
        }
      }
    }

    &-menu-settings-input {
      position: relative;
      display: flex;
      width: 100%;
      flex: 100%;
      align-items: center;
      border-radius: 0.25rem;

      input {
        &:hover {
          cursor: pointer;
        }
      }
    }

    &-menu-list {
      padding: 15px;
      display: flex;
      width: 250px;
      flex-wrap: wrap;
      background: #f8fafb;
      border-right: 1px solid $fil-light-gray;

      span {
        display: flex;
        flex: 100%;
        transition: 0.2s;

        &:first-child {
          padding-top: 0;
        }

        &:hover {
          color: $fil-blue;
          cursor: pointer;
        }
      }
    }
  }

  .span-selected {
    color: $fil-blue;
    cursor: pointer;
  }

  .search-close {
    position: absolute;
    top: 10px;
    right: 8px;
    margin-left: 5px;

    &:hover {
      cursor: pointer;
    }
  }

  .list-head {
    margin-top: 5px;
    font-size: 0.75em;
  }

  .menu-active {
    visibility: visible;
    opacity: 1;
  }

  .settings-item-dropdown {
    position: absolute;
    top: 150%;
    left: 0;
    padding: 15px 0;
    display: flex;
    visibility: hidden;
    width: 100%;
    flex-wrap: wrap;
    opacity: 0;
    background: $fil-white;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);
    transition: 0.2s;

    span {
      padding: 5px 15px;
      display: flex;
      flex: 100%;
      transition: 0.2s;

      &:hover {
        background: $fil-light-gray;
        cursor: pointer;
      }
    }
  }

  .dropdown-active {
    z-index: 2;
    top: calc(100% + 5px);
    visibility: visible;
    opacity: 1;
  }

  .settings-arrow {
    position: absolute;
    z-index: 2;
    right: 10px;
  }

  .dropdown-settings-bottom-menu {
    display: flex;
    flex: 100%;
    flex-wrap: wrap;
    align-items: flex-end;

    &-add {
      margin-top: 15px;
      padding-left: 2px;
      display: flex;
      flex-wrap: nowrap;

      span {
        margin-right: 15px;
        display: flex;
      }
    }
  }

  .add-blue {
    position: relative;
    overflow: hidden;
    color: $fil-blue;

    &::before {
      position: absolute;
      bottom: 1px;
      left: -100%;
      width: 100%;
      height: 1px;
      opacity: 0.6;
      content: '';
      background: $fil-blue;
      transition: 0.2s;
    }

    &:hover {
      cursor: pointer;

      &::before {
        left: 0;
      }
    }
  }

  .add-gray {
    transition: 0.2s;

    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }

  .filter-list-bottom-menu {
    display: flex;
    width: 100%;
    align-items: flex-end;

    &-content {
      margin-bottom: 10px;
      display: flex;
      width: 100%;
      align-items: center;
    }

    &-add {
      opacity: 0.7;
      transition: 0.2s;

      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }

    &-canel {
      margin-right: 10px;
      display: flex;
      align-items: center;

      svg {
        margin-left: auto;
      }
    }

    &-save {
      display: flex;
      align-items: center;
    }

    &-settings {
      margin-left: auto;
      opacity: 0.7;
      transition: 0.2s;

      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }

  .list {
    display: flex;
    height: 100%;

    &-item {
      display: inline-block;
      transition: all 0.2s;
    }

    &-enter-active {
      opacity: 0;
      transform: translateY(10px);
    }

    &-leave-to {
      opacity: 0;
      transform: translateY(10px);
    }

    &-leave-active {
      position: absolute;
    }
  }

  .one {
    &-item {
      transition: all 0.1s;
    }

    &-enter-active {
      opacity: 0;
      transform: translateY(10px);
    }

    &-leave-active {
      opacity: 0;
      transform: translateY(10px);
    }

    &-enter {
      opacity: 0;
    }

    &-leave-to {
      opacity: 0;
    }
  }

  .field {
    &-item {
      margin-right: 5px;
      margin-left: 5px;
      flex-shrink: 1;
      flex-grow: 1;
      flex-basis: 240px;
      transition: all 0.2s;

      @media (min-width: 800px) {
        max-width: calc(50% - 10px);
      }
    }

    &-enter-active {
      opacity: 0;
      transform: translateY(10px);
    }

    &-leave-to {
      opacity: 0;
      transform: translateY(10px);
    }

    &-leave-active {
      position: absolute;
    }
  }

  .checkbox-flex {
    margin: 0.5rem 0;
    flex: 100%;
  }

  .save-nowrap {
    padding-top: 2px;
    padding-left: 3px;
    white-space: nowrap;
  }

  .cancel-filter-modal {
    position: absolute;
    z-index: 101;
    top: calc(50vh - 200px);
    left: calc(50vw - 375px);
    padding: 1rem;
    display: flex;
    width: 750px;
    height: 160px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: $fil-white;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
    transition: 0.2s;
  }

  .flexbox {
    display: flex;
    align-items: center;
  }

  .edit-input {
    input {
      padding: 0;
      height: 25px;
      background-color: #f8fafb;
      border-color: transparent;

      &:focus {
        background: transparent;
        border-color: transparent;
        box-shadow: none;
      }
    }
  }

  .filter-multiselect {
    .multiselect__input {
      height: 20px;
    }

    input,
    select {
      &:focus {
        border-color: transparent;
        outline: none;
        box-shadow: none;
      }
    }
  }

  .modal-background {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
  }

  .width-100 {
    width: 100%;
  }

  .filterItem-flex {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  .close-visible {
    visibility: visible;
  }

  .checkboxes {
    display: flex;
    overflow-x: hidden;
    overflow-y: auto;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;

    .label-cbx .checkbox {
      max-width: 24px;
    }
  }

  .filter-flex {
    display: flex;
    flex-wrap: wrap;
  }
</style>
