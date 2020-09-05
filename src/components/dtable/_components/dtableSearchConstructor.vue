<template>
  <div
    v-if="settings.checkPermission ? hasPermission(settings.checkPermission) : true"
    class="mb-1"
    :class="settings.style || 'col'"
  >
    <input
      v-if="settings.type === 'input'"
      v-model="value"
      class="form-control"
      :placeholder="settings.placeholder"
    >
    <!--Для инпутов-->
    <!--@input="onFilterTable"-->
    <select
      v-if="settings.type === 'select'"
      v-model="value"
      class="form-control"
      @change="onFilterTable"
    >
      <option :value="settings.default">
        {{ settings.placeholder }}
      </option>
      <option
        v-for="optionSelect in settings.data"
        :key="optionSelect.id"
        :value="optionSelect.id"
      >
        {{ optionSelect.name }}
      </option>
    </select>
    <input-select
      v-if="settings.type === 'select-url'"
      v-model="value"
      :placeholder="settings.placeholder"
      track-by="label"
      :url="settings.url"
      :url-data="settings.urlData"
      :options="option"
      @getOption="option = $event"
      @input="onSelect"
    >
      <template #noResult>
        <span>Список пуст</span>
      </template>
      <template #noOptions>
        <span>Список пуст</span>
      </template>
    </input-select>
    <dropdown-form
      v-if="settings.type === 'dropdown'"
      v-model="value"
      :url="settings.url"
      track-by="name"
      :placeholder="settings.placeholder"
      :allow-empty="true"
      @input="onSelect"
    />
    <input-autocomplete
      v-if="settings.type === 'autocomplete'"
      v-model="value"
      :url="settings.url"
      :placeholder="settings.placeholder"
      @input="onSelect"
    />
    <input-datepicker
      v-if="settings.type === 'datepicker'"
      v-model="value"
      popover-align="left"
      :is-ranged="settings.isRanged"
      :placeholder="settings.placeholder"
      @input="onFilterTable"
    />
    <input-tree
      v-if="settings.type === 'inputTree'"
      v-model="value"
      :placeholder="settings.placeholder"
      :allow-empty="settings.allowEmpty || false"
      :data="inputTreeData"
      @input="onSelect"
    />
    <input-select-autocomplete
      v-if="settings.type === 'autocompleteSelect'"
      :placeholder="settings.placeholder"
      :url="settings.url"
      @select="onSelect"
    />
    <template v-if="settings.type === 'multiselect'">
      <input-select
        v-model="value"
        class="multiselect--height-auto"
        :allow-empty="settings.allowEmpty"
        :hide-selected="settings.hideSelected || false"
        :label="settings.typeLabel"
        :limit="settings.limit || 999"
        :limit-text="settings.limitText || function (count) { return `и еще ${count}` }"
        :multiple="settings.multiple || false"
        :options="settings.options"
        :placeholder="settings.placeholder"
        :preselect-first="settings.preselectFirst || false"
        :searchable="true"
        :track-by="settings.typeValue"
        :taggable="settings.taggable || false"
        :value="settings.default || ''"
        :url="settings.url"
        :url-data="settings.urlData"
        :disabled-open="settings.disabledOpen"
        @input="onSelect($event, settings.multiple || false)"
      />
    </template>
    <template v-if="settings.type === 'slot'">
      <slot/>
    </template>
    <!--Для проверки прав кнопки нужно передать checkPermission: 'название права'(по умолчанию не проверяет).-->
    <app-btn
      v-if="settings.type === 'button'"
      :color="settings.color"
      :text="settings.text"
      :title="settings.title"
      :disabled="settings.disabled || false"
      @click="$emit('onClick', settings.action)"
    >
      <font-awesome-icon
        v-if="settings.icon"
        :icon="settings.icon"
      />
      {{ settings.name }}
    </app-btn>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapGetters } from 'vuex'

export default {
  name: 'DtableSearchConstructor',
  components: {
    inputSelect: () => import(/* webpackChunkName: "input-select" */'@/components/input/input-select'),
    dropdownForm: () => import(/* webpackChunkName: "dropdown-form" */'@/components/dropdown/dropdown-form'),
    inputAutocomplete: () => import(/* webpackChunkName: "input-autocomplete" */'@/components/input/input-autocomplete'),
    inputDatepicker: () => import(/* webpackChunkName: "input-datepicker" */'@/components/input/input-datepicker'),
    inputTree: () => import(/* webpackChunkName: "input-tree" */'@/components/input/inputTree/inputTree'),
    inputSelectAutocomplete: () => import(/* webpackChunkName: "input-select-autocomplete" */'@/components/input/input-select-autocomplete')
  },
  props: {
    settings: {
      type: Object,
      required: true
    },
    valueSlot: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      option: [], // input-select option
      value: this.settings.default,
      name: this.settings.name,
      result: {},
      inputTreeData: [] // Данные для inputTree
    }
  },
  computed: {
    ...mapGetters([
      // Проверка прав hasPermission('nomenclature_edit')
      'hasPermission'
    ])
  },
  watch: {
    value (newVal, oldVal) {
      if (typeof oldVal === 'string' && typeof newVal === 'string') {
        if (oldVal.trim() !== newVal.trim()) {
          this.value = newVal.trim()
          this.onFilterTable()
        }
      }
    },
    valueSlot (newValue) {
      this.onSelectSlot(newValue)
    }
  },
  mounted () {
    if (this.settings.type === 'inputTree') this.createTreeData()
  },
  methods: {
    createTreeData () {
      /*
      * Формирование данных для inputTree
      * */
      const arr = Object.keys(this.settings.data).map(k => this.settings.data[k])
      this.inputTreeData = arr.sort((a, b) => a.number - b.number)
    },
    onFilterTable:
      debounce(function () {
        this.$emit('startFilter', {
          name: this.settings.name,
          value: this.value
        })
      }, 500),
    onSelect (data, isMultiple = false) {
      if (isMultiple) {
        let multipleValue = []

        data.forEach(item => {
          multipleValue.push(item[this.settings.typeValue])
        })

        this.$emit('startFilter', {
          isMultiple: true,
          name: this.settings.name,
          value: multipleValue
        })
      } else {
        this.$emit('startFilter', {
          name: this.settings.name,
          value: this.settings.typeValue ? data[this.settings.typeValue] : data.value
        })
      }
    },
    onSelectSlot (dataSlot) {
      let dataFilter = {
        name: this.settings.name,
        value: dataSlot
      }
      this.$emit('startFilter', dataFilter)
    }
  }
}
</script>
