<template>
  <div>
    <template v-if="settings.type === 'checkbox'">
      <checkbox
        v-model="selected"
        :disabled="disabled"
      >
        {{ settings.placeholder }}
      </checkbox>
    </template>
    <input
      v-if="settings.type === 'hidden'"
      v-model="selected"
      type="hidden"
    >
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
      v-if="settings.type === 'input'"
      v-model="selected"
      class="form-control"
      :class="{ 'is-invalid': isValidationField, 'form-control-sm': isSmall }"
      :placeholder="settings.placeholder"
    >
    <input-autocomplete
      v-if="settings.type === 'autocomplete'"
      v-model="selected"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :url="settings.url"
    />
    <input-datepicker
      v-if="settings.type === 'datepicker'"
      v-model="selected"
      popover-align="left"
      :is-ranged="settings.isRanged"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
    />
    <input-document-form
      v-if="settings.type === 'documentForm'"
      v-model="selected"
    />
    <input-icon
      v-if="settings.type === 'inputIcon'"
      v-model="selected"
      :icon-name="settings.icon"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :type="settings.inputType"
    />
    <input-file
      v-if="settings.type === 'inputFile'"
    />
    <!--Input Tree url/data-->
    <input-tree
      v-if="settings.type === 'inputTree'"
      v-model="selected"
      :data="settings.data"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :url="settings.url"
    />
    <!--Multiselect url/options-->
    <input-select
      v-if="settings.type === 'multiselect'"
      v-model="selected"
      :is-valid="isValidationField"
      :is-small="isSmall"
      :label="settings.typeValue || 'name'"
      :options="settings.data"
      :placeholder="settings.placeholder"
      :track-by="settings.typeKey || 'id'"
      :url="settings.url"
      :close-on-select="settings.closeOnSelect"
      :hide-selected="settings.hideSelected"
      :multiple="settings.multiple"
      :preserve-search="settings.preserveSearch"
      :searchable="settings.searchable"
      :storage="settings.storage"
      :taggable="settings.taggable"
      :url-data="settings.urlData"
    >
      <template #noOptions>
        <span>Загрузка данных...</span>
      </template>
      <template #noResult>
        <span>Ничего не найдено</span>
      </template>
    </input-select>
    <input-regex
      v-if="settings.type === 'inputRegex'"
      v-model="selected"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :start-characters="settings.startCharacters"
      :regex-mask="settings.regexMask"
    />
    <!--СУММА-->
    <input-sum
      v-if="settings.type === 'sum'"
      v-model="selected"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
      :decimal-limit="settings.decimalLimit"
    />
    <!--Телефонный номер-->
    <input-tel
      v-if="settings.type === 'tel'"
      v-model="selected"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
    />
    <!--Email-->
    <input-mail
      v-if="settings.type === 'mail'"
      v-model="selected"
      :is-valid="isValidationField"
      :placeholder="settings.placeholder"
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
    <select
      v-if="settings.type === 'select'"
      v-model="selected"
      class="form-control"
      :class="{ 'is-invalid': isValidationField }"
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
      :class="'btn-' + (settings.color || 'success')"
      @click="$emit('onClick', settings.action)"
    >
      <font-awesome-icon :icon="settings.icon" />
      {{ settings.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputElementComponent',
  components: {
    dropdownForm: () => import(/* webpackChunkName: "dropdown-form" */'@/components/dropdown/dropdown-form'),
    checkbox: () => import(/* webpackChunkName: "checkbox" */'@/components/checkbox/checkbox'),
    inputAutocomplete: () => import(/* webpackChunkName: "input-autocomplete" */'@/components/input/input-autocomplete'),
    inputDatepicker: () => import(/* webpackChunkName: "input-datepicker" */'@/components/input/input-datepicker'),
    inputDocumentForm: () => import(/* webpackChunkName: "input-document-form" */'@/components/input/input-document-form/inputDocumentForm'),
    inputFile: () => import(/* webpackChunkName: "input-file" */ '@/components/input/inputFile/input-file'),
    inputIcon: () => import(/* webpackChunkName: "input-icon" */ '@/components/input/input-icon'),
    inputMail: () => import(/* webpackChunkName: "input-mail" */'@/components/input/input-mail'),
    inputRegex: () => import(/* webpackChunkName: "input-regex" */'@/components/input/input-regex'),
    inputSum: () => import(/* webpackChunkName: "input-sum" */'@/components/input/input-sum'),
    inputTel: () => import(/* webpackChunkName: "input-tel" */'@/components/input/input-tel'),
    inputTree: () => import(/* webpackChunkName: "input-tree" */'@/components/input/inputTree/inputTree'),
    inputSelect: () => import(/* webpackChunkName: "input-select" */'@/components/input/input-select'),
    inputAutocompleteMultiselect: () => import(/* webpackChunkName: "input-autocomplete-multiselect" */'@/components/input/input-autocomplete-multiselect')
  },
  props: {
    isSmall: {
      type: Boolean,
      default: false
    },
    settings: {
      type: Object,
      required: true
    },
    v: {
      type: Object,
      default: null
    },
    value: {
      type: [ Object, String, Number ],
      required: true
    }
  },
  data () {
    return {
      selected: this.value
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
    value (newValue) {
      if (newValue === this.selected) return
      this.selected = newValue
    },
    selected () {
      this.setDefaultFormValue()
      this.checkValidate()
    }
  },
  mounted () {
    this.setDefaultFormValue()
  },
  methods: {
    checkValidate () {
      /*
      * Если объект валидации приходит сверху, мы активируем ее при изменении значения
      * */
      if (this.isRequired) {
        this.v.$touch()
      }
    },
    setDefaultFormValue () {
      let result = !!this.settings.typeKey && !!this.selected
        ? this.selected[this.settings.typeKey]
        : this.selected

      this.$emit('onChange', result, this.selected)
    }
  }
}
</script>
