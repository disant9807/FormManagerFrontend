<template>
  <div class="input-select-autocomplete">
    <multiselect
      v-model="value"
      label="label"
      track-by="label"
      :placeholder="placeholder"
      open-direction="bottom"
      :options="options"
      :multiple="false"
      :searchable="true"
      :loading="isLoadingOptions"
      :internal-search="false"
      :clear-on-select="false"
      :close-on-select="true"
      :max-height="300"
      :show-no-results="true"
      :hide-selected="true"
      :show-labels="false"
      :class="[isOpen ? currentHover : '', { 'is-invalid': isValid }]"
      @search-change="searchChange"
      @open="fetchOptions('')"
      @close="onClose"
      @select="onSelectResult"
    >
      <template #noResult>
        <span>Ничего не найдено</span>
      </template>
    </multiselect>
  </div>
</template>

<script>
import ApiService from '@/utils/api.service'
import debounce from 'lodash/debounce'
import Multiselect from 'vue-multiselect'

export default {
  name: 'InputSelectAutocomplete',
  components: { Multiselect },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: 'nomenclature/autocomplete/brands'
    },
    defaultValue: {
      type: [Object, String],
      default: ''
    },
    isValid: {
      type: Boolean,
      default: false
    },
    allowEmptySearch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: '',
      options: [],
      isLoadingOptions: false, // Спинер загрузки
      isOpen: false // Состояние списка
    }
  },
  computed: {
    currentHover () {
      return !this.isValid ? 'bootstrap-hover-valid' : 'bootstrap-hover-invalid'
    }
  },
  watch: {
    defaultValue (newValue) {
      if (!this.value) { this.value = newValue }
    }
  },
  methods: {
    fetchOptions (query) {
      this.isOpen = true
      this.isLoadingOptions = true
      ApiService
        .post(this.url, { term: query })
        .then(({ data }) => {
          this.options = data[0].label ? data : []
          this.isLoadingOptions = false
        })
        .catch(err => console.error(err))
    },
    searchChange: debounce(function (data) {
      if (!data && !this.allowEmptySearch) { return }
      this.fetchOptions(data)
    }, 200),
    onSelectResult (data) {
      this.$emit('select', data)
    },
    onClose () {
      setTimeout(() => { this.isOpen = false }, 201)
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss">
  .input-select-autocomplete {
    .multiselect__placeholder {
      margin-top: -5px;
      margin-bottom: -5px;
      overflow: hidden;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
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
        background-color: #fff;
        border-color: #d2e6f9;
        border-radius: 5px;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(98, 168, 234, 0.25);
      }
    }

    .bootstrap-hover-invalid {
      .multiselect__tags {
        background-color: #fff;
        border-color: #d2e6f9;
        border-radius: 5px;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(249, 104, 104, 0.25);
      }
    }
  }
</style>
