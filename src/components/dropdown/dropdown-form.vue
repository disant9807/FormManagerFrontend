<template>
  <div
    v-on-clickaway="hideFormActive"
    class="search dropdown-form cursor-pointer"
  >
    <div class="search__buttons flex">
      <div
        v-if="isSpinner && showRefresh"
        class="dropdown-form__btn"
        @click="reFetchSearchData"
      >
        <font-awesome-icon
          size="sm"
          icon="sync-alt"
          :class="{ 'dropdown-form--rotate': isRefreshed }"
        />
      </div>
      <div
        class="dropdown-form__btn-dd"
        :class="{ 'svgrotate-dropdown': formInputActive }"
        @click="fetchingSearchData"
      >
        <font-awesome-icon icon="caret-down" />
      </div>
    </div>
    <input
      class="form-control search__input"
      :class="[{ 'active': formInputActive }, { 'is-invalid': isValid }, {'form-control-sm': isSmall}]"
      :placeholder="placeholder"
      :value="searchText[trackBy]"
      @input="changeValue($event.target.value)"
      @click="handleFormActive(true)"
      @keyup="reFetchSearchData"
    >
    <transition
      name="fade"
      mode="in-out"
    >
      <div
        v-show="listArray.length && formInputActive"
        class="search__result"
      >
        <v-simplebar>
          <ul>
            <li
              v-for="(item, index) in listArray"
              :key="index"
              class="dropdown-item dropdown-form__item"
              @click="getData(item)"
            >
              {{ item[trackBy] }}
            </li>
          </ul>
        </v-simplebar>
      </div>
    </transition>
  </div>
</template>

<script>
import ApiService from '@/utils/api.service'
import VSimplebar from '@/components/v-simplebar'

export default {
  name: 'DropdownForm',
  components: { VSimplebar },
  props: {
    allowEmpty: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Object]
    },
    placeholder: {
      type: [String],
      default: ''
    },
    trackBy: {
      type: String,
      default: 'label'
    },
    url: {
      type: [String]
    },
    isValid: {
      type: Boolean,
      default: false
    },
    isSpinner: {
      type: Boolean,
      default: true
    },
    isSmall: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchText: this.value || '',
      listArray: [],
      formInputActive: false,
      isRefreshed: false,
      showRefresh: true
    }
  },
  methods: {
    getData (data) {
      this.searchText = data
      this.formInputActive = false
      this.$emit('input', data)
    },
    hideFormActive () {
      this.formInputActive = false
    },
    fetchingSearchData () {
      // Если дропдаун открыт, закрываем его и прекращаем выполнение функции
      if (this.formInputActive) {
        this.formInputActive = false
        return
      }
      // Показываем дропдаун
      this.formInputActive = true
      this.fetchData()
    },
    reFetchSearchData () {
      // Запускаем спинер, пока подтягиваются данные
      this.isRefreshed = true
      this.fetchData()
      if (!this.formInputActive) this.formInputActive = true
    },
    fetchData () {
      this.isRefreshed = true
      let searchText = this.searchText[this.trackBy] || ''

      ApiService.get(this.url, { term: searchText })
        .then((res) => {
          // Если данные успешно подтянулись, выключаем спиннер
          // Даем спинеру докрутиться
          setTimeout(() => {
            this.isRefreshed = false
          }, 1000)

          this.listArray = []
          if (this.allowEmpty) {
            const key = this.trackBy
            const obj = {}
            obj[key] = this.placeholder
            this.listArray.push(obj)
          }
          // Записываем данные в массив
          this.listArray = this.listArray.concat(res.data)
        })
        .catch(err => console.error('Динамический поиск получил следующую ошибку: ', err))
    },
    handleFormActive () {
      // Если открыт дропдаун не запрашиваем повторно обновление данных
      if (this.formInputActive !== true) {
        this.formInputActive = true
        this.fetchData()
      }
    },
    changeValue (search) {
      this.searchText[this.trackBy] = search
    }
  }
}
</script>

<style lang="scss">
.search {
  position: relative;
  font-size: 14px;

  &__buttons {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 2px;
  }

  &__input {
    padding: 0.375rem 2.5rem 0.375rem 0.75rem;

    &.active {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;

      &:focus {
        box-shadow: none;
      }
    }
  }
}

.dropdown-form {
  &__btn,
  &__btn-dd {
    padding: 7px 5px;
  }

  &__btn-dd {
    transition: all 0.2s ease-in-out;
  }

  &__container {
    margin: 0;
    width: 100%;
    max-height: 300px;
    border-top: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  &__item {
    padding: 0.375rem 2.5rem 0.375rem 0.75rem;
    font-size: 14px;
  }

  &__spinner {
    position: relative;
    top: 3px;
    width: 30px;
  }

  &--rotate {
    animation: dropdownRotate 1s forwards linear;
  }

  .form-control:focus {
    border-color: #e4eaec;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  & .svgrotate-dropdown {
    transform: rotate(180deg);
  }
}

@keyframes dropdownRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
}
</style>
