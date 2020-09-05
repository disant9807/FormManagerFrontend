<template>
  <input-top-label
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
    <template v-if="settings.type === 'checkbox'">
      <checkbox
        v-model="selected"
        :disabled="disabled"
        :input-id="keyInputId"
      >
        {{ settings.placeholder }}
      </checkbox>
    </template>
    <template v-if="settings.type === 'checkboxArray'">
      <checkbox-array
        v-model="selected"
        :array="settings.data"
        :label="settings.trackLabel"
        :track-id="settings.trackId"
        :direction="settings.direction"
        :field-name="fieldName"
      />
    </template>
    <!--Bootstrap checkbox switch-->
    <b-form-checkbox
      v-if="settings.type === 'checkboxSwitch'"
      v-model="selected"
      :checked="settings.default || false"
      switch
    >
      {{ settings.placeholder }}
    </b-form-checkbox>
    <dropdown-form
      v-if="settings.type === 'dropdown'"
      v-model="selected"
      :allow-empty="true"
      :track-by="settings.typeValue"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :url="settings.url"
    />

    <input
      v-if="settings.type === 'hidden'"
      v-model="selected"
      type="hidden"
      :class="settings.inputClass"
    >
    <input
      v-if="settings.type === 'input'"
      v-model="selected"
      class="form-control"
      :disabled="settings.disabled"
      :class="[{ 'is-invalid': isValidationField }].concat(settings.inputClass)"
      :placeholder="settings.placeholder"
    >
    <input
      v-if="settings.type === 'inputNumber'"
      v-model="selected"
      type="number"
      class="form-control"
      :disabled="settings.disabled"
      :class="[{ 'is-invalid': isValidationField }].concat(settings.inputClass)"
      :placeholder="settings.placeholder"
    >
    <input
      v-if="settings.type === 'inputMail'"
      v-model="selected"
      type="email"
      class="form-control"
      :disabled="settings.disabled"
      :class="[{ 'is-invalid': isValidationField }].concat(settings.inputClass)"
      :placeholder="settings.placeholder"
    >
    <textarea
      v-if="settings.type === 'textArea'"
      v-model="selected"
      class="form-control"
      :rows="settings.rows || 3"
      :class="[{ 'is-invalid': isValidationField }].concat(settings.inputClass)"
      :placeholder="settings.placeholder"
    />
    <input-add-rows
      v-if="settings.type === 'inputAddRows'"
      :value="settings.default"
      :add-row-on-type="settings.addRowOnType"
      :schema="settings.schema"
      :v="v"
      :class="settings.inputClass"
      @input="handleUpdateValue"
    />
    <input-autocomplete
      v-if="settings.type === 'autocomplete'"
      v-model="selected"
      :value="settings.default"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :url="settings.url"
      :class="settings.inputClass"
    />
    <input-autocomplete-multiselect
      v-if="settings.type === 'autocompleteMultiselect'"
      :is-valid="isValidationField"
      :label="settings.typeValue || 'name'"
      :options="settings.data"
      :placeholder="settings.placeholder"
      :track-by="settings.typeKey || 'id'"
      :url="settings.url"
    />
    <input-datepicker
      v-if="settings.type === 'datepicker'"
      v-model="selected"
      popover-align="left"
      :is-ranged="settings.isRanged"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :class-input="settings.inputClass"
      :max-date="settings.maxDate"
      :min-date="settings.minDate"
    />
    <input-date-timepicker
      v-if="settings.type === 'inputDateTimepicker'"
      v-model="selected"
      :is-valid="isValidationField"
      :min-date="settings.minDate"
      :max-date="settings.maxDate"
      :placeholder="settings.placeholder"
      :target-id="settings.targetId"
    />
    <input-document-form
      v-if="settings.type === 'documentForm'"
      v-model="selected"
      :class="settings.inputClass"
    />
    <input-icon
      v-if="settings.type === 'inputIcon'"
      v-model="selected"
      :icon-name="settings.icon"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :type="settings.inputType"
      :class="settings.inputClass"
    />
    <input-file
      v-if="settings.type === 'inputFile'"
      v-model="selected"
      :class="settings.inputClass"
    />
    <!--Input Tree url/data-->
    <input-tree
      v-if="settings.type === 'inputTree'"
      v-model="selected"
      :data="settings.data"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :url="settings.url"
      :class="settings.inputClass"
    />
    <!--Multiselect url/options-->
    <input-select
      v-if="settings.type === 'multiselect'"
      v-model="selected"
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
    >
      <template #noOptions>
        <span>Загрузка данных...</span>
      </template>
      <template #noResult>
        <span>Ничего не найдено</span>
      </template>
    </input-select>
    <!--СУММА-->
    <input-sum
      v-if="settings.type === 'sum'"
      v-model="selected"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :decimal-limit="settings.decimalLimit"
      :class="settings.inputClass"
    />
    <input-regex
      v-if="settings.type === 'inputRegex'"
      v-model="selected"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :start-characters="settings.startCharacters"
      :regex-mask="settings.regexMask"
      :class="settings.inputClass"
    />
    <input-mask
      v-if="settings.type === 'inputMask'"
      v-model="selected"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :mask="settings.mask"
      :guide="settings.guide"
      :start-characters="settings.startCharacters"
      :class="settings.inputClass"
    />
    <!--Телефонный номер-->
    <input-tel
      v-if="settings.type === 'tel'"
      v-model="selected"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :class="settings.inputClass"
    />
    <!--Время-->
    <input-time
      v-if="settings.type === 'inputTime'"
      v-model="selected"
      :default-value="settings.default"
      :is-valid="isValidationField"
    />
    <!--Email-->
    <input-mail
      v-if="settings.type === 'mail'"
      v-model="selected"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :class="settings.inputClass"
    />

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
    <div
      v-if="settings.type === 'button'"
      class="btn"
      :class="['btn-' + (settings.color || 'success')].concat(settings.inputClass)"
      @click="$emit('onClick', settings.action)"
    >
      <font-awesome-icon :icon="settings.icon" />
      {{ settings.title }}
    </div>
    <file-upload-model
      v-if="settings.type === 'fileUploadModel'"
      v-model="selected"
      :file-type="settings.fileType"
      :image-preview="settings.imagePreview"
      :disable-clipboard="settings.disableClipboard || false"
      :file-type-select-option="settings.fileTypeSelectOption || []"
      :file-type-select-url="settings.fileTypeSelectUrl || ''"
      :file-type-select-url-data="settings.fileTypeSelectUrlData || {}"
      :file-type-select-settings="settings.fileTypeSelectSettings || {}"
      :file-name-required="settings.fileNameRequired || false"
    />
    <!--<timepicker-->
    <!--  v-if="settings.type === 'timepicker'"-->
    <!--  v-model="selected"-->
    <!--  :no-label="settings.componentNoLabel"-->
    <!--  :fit-content="settings.fitContent"-->
    <!--/>-->
  </input-top-label>
</template>

<script>
import inputTopLabel from '@/components/input/input-top-label'

export default {
  name: 'FormConstructorField',
  components: {
    inputTopLabel,
    dropdownForm: () => import(/* webpackChunkName: "dropdown-form" */'@/components/dropdown/dropdown-form'),
    checkbox: () => import(/* webpackChunkName: "checkbox" */'@/components/checkbox/checkbox'),
    checkboxArray: () => import(/* webpackChunkName: "checkboxArray" */'@/components/checkbox/checkboxArray'),
    inputAddRows: () => import(/* webpackChunkName: "input-add-rows" */ '@/components/input/inputAddRows/inputAddRows'),
    inputAutocomplete: () => import(/* webpackChunkName: "input-autocomplete" */'@/components/input/input-autocomplete'),
    inputAutocompleteMultiselect: () => import(/* webpackChunkName: "input-autocomplete-multiselect" */'@/components/input/input-autocomplete-multiselect'),
    inputDatepicker: () => import(/* webpackChunkName: "input-datepicker" */'@/components/input/input-datepicker'),
    inputDateTimepicker: () => import(/* webpackChunkName: "input-dateTimepicker" */'@/components/input/input-dateTimepicker'),
    inputDocumentForm: () => import(/* webpackChunkName: "input-document-form" */'@/components/input/input-document-form/inputDocumentForm'),
    inputFile: () => import(/* webpackChunkName: "input-file" */ '@/components/input/inputFile/input-file'),
    inputIcon: () => import(/* webpackChunkName: "input-icon" */ '@/components/input/input-icon'),
    inputMail: () => import(/* webpackChunkName: "input-mail" */'@/components/input/input-mail'),
    inputMask: () => import(/* webpackChunkName: "input-mask" */'@/components/input/input-mask'),
    inputRegex: () => import(/* webpackChunkName: "input-regex" */'@/components/input/input-regex'),
    inputSelect: () => import(/* webpackChunkName: "input-select" */'@/components/input/input-select'),
    inputSum: () => import(/* webpackChunkName: "input-sum" */'@/components/input/input-sum'),
    inputTel: () => import(/* webpackChunkName: "input-tel" */'@/components/input/input-tel'),
    inputTime: () => import(/* webpackChunkName: "input-time" */'@/components/input/input-time'),
    inputTree: () => import(/* webpackChunkName: "input-tree" */'@/components/input/inputTree/inputTree')
    // timepicker: () => import(/* webpackChunkName: "timepicker" */'@/components/datepicker/timepicker')
  },
  props: {
    settings: {
      type: Object,
      required: true
    },
    v: {
      type: Object,
      default: null
    },
    form: {
      type: Object,
      default: () => {}
    },
    fieldName: {
      type: String,
      default: ''
    },
    keyInputId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selected: this.settings.default,
      disabled: false,
      hidden: false
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
        this.checkValidate()
      },
      deep: true
    },
    'settings.default' () {
      if (this.settings.hasOwnProperty('default')) {
        this.selected = this.settings.default
      }
    }
  },
  mounted () {
    this.setFormValue()

    if (
      this.settings.hasOwnProperty('storage') &&
      this.settings.storage.hasOwnProperty('store') &&
      !!this.settings.storage.store &&
      this.settings.storage.hasOwnProperty('name') &&
      !!this.settings.storage.name
    ) {
      if (localStorage.getItem(this.settings.storage.name)) {
        this.selected = JSON.parse(localStorage.getItem(this.settings.storage.name))
      }
    }
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
    setFormValue () {
      /*
      * Формируем отслеживаемое значение и передаем наверх
      * */
      let result = ''

      if (!!this.settings.typeKey && !!this.selected) {
        if (Array.isArray(this.selected)) {
          result = this.selected.map(item => item[this.settings.typeKey])
        } else {
          result = this.selected[this.settings.typeKey]
        }
      } else {
        result = this.selected
      }

      if (
        this.settings.hasOwnProperty('storage') &&
        this.settings.storage.hasOwnProperty('store') &&
        !!this.settings.storage.store &&
        this.settings.storage.hasOwnProperty('name') &&
        !!this.settings.storage.name &&
        this.selected !== undefined
      ) {
        localStorage.setItem(this.settings.storage.name, JSON.stringify(this.selected))
      }

      this.$emit('onChange', result, this.selected)
    },
    checkValidate () {
      if (this.isRequired) {
        this.v.$touch()
      }
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
    }
  }
}
</script>
