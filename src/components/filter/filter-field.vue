<template>
  <filter-top-label
    v-if="!hidden"
    :name="settings.label"
    :no-label="settings.noLabel"
    :is-required="isRequired"
    :is-valid="isValidationField"
    :position="settings.labelPos"
    :label-class="settings.labelClass"
    :action-class="settings.actionClass"
    :align="settings.align"
  >
    <!--Временно скрыл тк функционал не готов (кнопка должна показываться только для последнего вводимого поля)-->
    <!--<div-->
    <!--  class="form-group-showButton"-->
    <!--  :class="{ 'visibleShowButton': showVisible }"-->
    <!--&gt;-->
    <!--  Показать-->
    <!--</div>-->
    <input
      v-if="settings.type === 'input'"
      v-model="selected"
      class="form-control"
      :disabled="settings.disabled"
      :class="[{ 'is-invalid': isValidationField }].concat(settings.inputClass)"
      :placeholder="settings.placeholder"
      @keyup="showInputButton"
    >
    <!--Инпут телефон с маской-->
    <input-tel
      v-if="settings.type === 'tel'"
      v-model="selected"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :class="settings.inputClass"
    />

    <input-select
      v-if="settings.type === 'multiselect'"
      v-model="selected"
      class="filter-multiselect"
      :allow-empty="settings.allowEmpty"
      :close-on-select="settings.closeOnSelect"
      :hide-selected="settings.hideSelected"
      :is-valid="isValidationField"
      :label="settings.typeValue || 'name'"
      :multiple="settings.multiple"
      :max-height="settings.maxHeight || 300"
      :options="settings.data"
      :placeholder="settings.placeholder"
      :preserve-search="settings.preserveSearch"
      :searchable="settings.searchable"
      :storage="settings.storage"
      :taggable="settings.taggable"
      :track-by="settings.typeKey || 'id'"
      :request-method="settings.requestMethod || 'get'"
      :url="settings.url"
      :url-data="settings.urlData"
      :disabled="settings.disabled"
      :disabled-open="settings.disabledOpen"
      :preselect-first="settings.preselectFirst"
      :input-class="settings.inputClass"
      :query-search-name="settings.querySearchName"
      @change="showSelectButton"
    >
      <template #noOptions>
        <span>Загрузка данных...</span>
      </template>
      <template #noResult>
        <span>Ничего не найдено</span>
      </template>
    </input-select>

    <select
      v-if="settings.type === 'select'"
      v-model="selected"
      class="form-control"
      :class="[{ 'is-invalid': isValidationField }].concat(settings.inputClass)"
    >
      <option :value="null">
        {{ settings.placeholder }}
      </option>
      <option
        v-for="option in settings.data"
        :key="option.id"
        :value="option.id"
        :selected="option.id === settings.default"
      >
        {{ option.name }}
      </option>
    </select>
    <!--Bootstrap switch checkbox (это добавлено для humanresources, пересмотреть во время доработки компонента filters)-->
    <b-form-checkbox
      v-if="settings.type === 'checkboxSwitch'"
      v-model="selected"
      class="mt-2"
      :checked="settings.default || false"
      switch
    >
      {{ settings.placeholder }}
    </b-form-checkbox>
  </filter-top-label>
</template>

<script>
import filterTopLabel from '@/components/filter/filter-top-label'

export default {
  name: 'FilterField',
  components: {
    filterTopLabel,
    inputSelect: () => import(/* webpackChunkName: "input-select" */'@/components/input/input-select'),
    inputTel: () => import(/* webpackChunkName: "input-tel" */'@/components/input/input-tel')
  },
  props: {
    settings: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      default: () => {}
    },
    fieldName: {
      type: String,
      default: ''
    },
    value: {
      type: [Object, String, Number, Array, Boolean],
      default: ''
    }
  },
  data () {
    return {
      selected: this.value,
      disabled: false,
      hidden: false,
      showVisible: false
    }
  },
  computed: {
    isRequired () {
      return this.settings.hasOwnProperty('required') && !!this.settings.required && this.v !== null
    },
    isValidationField () {
      return this.isRequired && this.v.$error
    }
  },
  watch: {
    form: {
      handler () {
        this.checkWatchField()
      },
      deep: true
    },
    selected: {
      /*
      * Необходим для объектов (например поменяли имя файлу)
      * */
      handler () {
        this.setFormValue()
      },
      deep: true
    },
    value (value) {
      this.selected = value
    }
  },
  mounted () {
    this.setFormValue()
  },
  methods: {
    setDefaultValue () {
      /*
      * Вызывается в formConstructor для сброса на дефолтные значения.
      * */
      this.selected = this.settings.hasOwnProperty('default')
        ? this.settings.default
        : undefined

      this.$emit('onChange', this.selected, this.selected)
    },
    showInputButton () {
      if (this.value) {
        this.showVisible = true
      } else {
        this.showVisible = false
      }
    },
    showSelectButton  () {
      if (this.selected.value) {
        this.showVisible = true
      } else {
        this.showVisible = false
      }
    },
    setFormValue () {
      /*
      * Формируем отслеживаемое значение и передаем наверх
      * */
      let result = ''
      result = this.selected
      this.$emit('input', result, this.selected, this.settings)
    },
    checkWatchField () {
      const watch = this.settings.watch

      if (
        watch &&
        watch.hasOwnProperty('fields') &&
        watch.hasOwnProperty('action') &&
        watch.hasOwnProperty('callback') &&
        typeof watch.callback === 'function'
      ) {
        const arrFields = Array.isArray(watch.fields)
          ? watch.fields.map(field => this.form[field])
          : this.form[watch.fields]

        if (watch.action === 'disable') {
          this.disabled = watch.callback(arrFields)
        }
        if (watch.action === 'hide') {
          this.hidden = watch.callback(arrFields)
        }

        if (this.disabled || this.hidden) {
          this.selected = this.settings.default
        }
      }
    },
    handleUpdateValue (data) {
      let result = ''

      if (!!this.settings.typeKey && !!data) {
        if (Array.isArray(data)) {
          result = this.selected.map(item => item[this.settings.typeKey])
        } else {
          result = data[this.settings.typeKey]
        }
      } else {
        result = data
      }

      this.$emit('onChange', result, data)
    },
    clearData () {
      this.selected = ''
    }
  }
}
</script>

<style lang="scss">
  .visibleShowButton {
    display: flex;
  }
</style>
