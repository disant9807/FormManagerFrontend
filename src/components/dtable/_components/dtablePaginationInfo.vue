<template>
  <div v-html="paginationInfo" />
</template>

<script>
export default {
  props: {
    css: {
      type: Object,
      default () {
        return {
          infoClass: 'left floated left aligned six wide column'
        }
      }
    },
    infoTemplate: {
      type: String,
      default () {
        return 'Записи с {from} по {to} из {total}'
      }
    },
    noDataTemplate: {
      type: String,
      default () {
        return 'Извините, не удалось загрузить данные'
      }
    }
  },
  data () {
    return {
      tablePagination: null
    }
  },
  computed: {
    paginationInfo () {
      if (this.tablePagination == null || this.tablePagination.total == 0) {
        return this.noDataTemplate
      }
      const pagination = this.tablePagination
      // всего страниц
      const numberOfPages = Math.floor((pagination.total + pagination.per_page - 1) / pagination.per_page)
      // первый номер на странице
      const start = (pagination.current_page * pagination.per_page) - (pagination.per_page - 1)
      // последний номер на странице
      const end = Math.min(start + pagination.per_page - 1, pagination.total)

      return this.infoTemplate
        .replace('{from}', start || 0)
        .replace('{to}', end || 0)
        .replace('{total}', pagination.total || 0)
    }
  },
  methods: {
    setPaginationData (tablePagination) {
      this.tablePagination = tablePagination
    },
    resetData () {
      this.tablePagination = null
    }
  }
}
</script>

<style>

</style>
