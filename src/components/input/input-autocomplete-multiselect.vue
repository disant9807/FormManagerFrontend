<template>
  <div class="input-autocomplete-multiselect">
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
      :show-no-options="false"
      :hide-selected="true"
      :show-labels="false"
      :class="[isOpen ? currentHover : '', isValid ? 'is-invalid' : '', isSmall ? 'bootstrap-control-sm' : '']"
      @open="onOpen"
      @close="onClose"
      @search-change="searchChange"
      @select="onSelectResult"
    >
      <!--Результат поиска не найден-->
      <template #noResult>
        <span>Ничего не найдено</span>
      </template>
      <!--Замена(убираем) toggle-->
      <template #caret>
        <span />
      </template>
    </multiselect>
  </div>
</template>

<script>
import ApiService from '@/utils/api.service'
import debounce from 'lodash/debounce'
import Multiselect from 'vue-multiselect'

export default {
  name: 'InputAutocompleteMultiselect',
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
    isSmall: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: '',
      options: [], // Список
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
      if (!query) {
        this.options = []
        return
      }

      this.isLoadingOptions = true
      ApiService
        .post(this.url, { term: query })
        .then(({ data }) => {
          this.options = +data[0].value ? data : []
          setTimeout(() => { this.isLoadingOptions = false }, 1000)
        })
        .catch(err => console.error(err))
    },
    searchChange: debounce(function (data) {
      this.fetchOptions(data)
    }, 200),
    onSelectResult (data) {
      this.$emit('select', data)
    },
    onClose () {
      this.isOpen = false
    },
    onOpen () {
      this.isOpen = true
    }
  }
}
</script>

<style lang="scss">
  .input-autocomplete-multiselect {
    .multiselect__spinner {
      z-index: 2;
      top: 2px;
      right: 2px;
      width: 30px;
      height: 30px;
    }

    /* Эмитация hover эфектов Bootstrap input */
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

    /* Эмитация стилей form-control-sm */
    .bootstrap-control-sm {
      .multiselect__tags {
        padding-top: 4px;
        height: 31px;
      }
    }
  }
</style>
