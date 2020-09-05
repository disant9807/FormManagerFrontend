<template>
  <nav aria-label="Навигация по таблице Проектов">
    <ul class="pagination">
      <li :class="['page-item', {'disabled': isOnFirstPage}]">
        <a
          class="page-link"
          href=""
          @click.prevent="loadPage('prev')"
        ><span>&laquo;</span></a>
      </li>

      <template v-if="notEnoughPages">
        <li
          v-for="n in totalPage"
          :key="n"
          :class="['page-item', 'page-link', {'active': isCurrentPage(n)}]"
          @click.prevent="loadPage(n)"
          v-html="n"
        />
      </template>
      <template v-else>
        <li
          v-for="n in windowSize"
          :key="n"
          :class="['page-item', 'page-link', {'active': isCurrentPage(windowStart+n-1)}]"
          @click.prevent="loadPage(windowStart+n-1)"
          v-html="windowStart+n-1"
        />
      </template>

      <li :class="['page-item', {'disabled': isOnLastPage}]">
        <a
          class="page-link"
          href=""
          @click.prevent="loadPage('next')"
        ><span>&raquo;</span></a>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  props: {
    css: {
      type: Object,
      default () {
        return {
          wrapperClass: 'ui right floated pagination menu',
          activeClass: 'active large',
          disabledClass: 'disabled',
          pageClass: 'item',
          linkClass: 'icon item',
          paginationClass: 'ui bottom attached segment grid',
          paginationInfoClass: 'left floated left aligned six wide column',
          dropdownClass: 'ui search dropdown',
          icons: {
            first: 'angle double left icon',
            prev: 'left chevron icon',
            next: 'right chevron icon',
            last: 'angle double right icon'
          }
        }
      }
    },
    onEachSide: {
      type: Number,
      default () {
        return 2
      }
    }
  },
  data () {
    return {
      eventPrefix: 'dtable-pagination:',
      tablePagination: null
    }
  },
  computed: {
    totalPage () {
      return this.tablePagination === null
        ? 0
        : Math.floor((+this.tablePagination.total + this.tablePagination.per_page - 1) / this.tablePagination.per_page)
    },
    isOnFirstPage () {
      return this.tablePagination === null
        ? false
        : this.tablePagination.current_page === 1
    },
    isOnLastPage () {
      return this.tablePagination === null
        ? false
        : this.tablePagination.current_page === this.totalPage
    },
    notEnoughPages () {
      return this.totalPage < (this.onEachSide * 2) + 4
    },
    windowSize () {
      return this.onEachSide * 2 + 1
    },
    windowStart () {
      return !this.tablePagination || this.tablePagination.current_page <= this.onEachSide ? 1
        : this.tablePagination.current_page >= (this.totalPage - this.onEachSide) ? this.totalPage - this.onEachSide * 2
          : this.tablePagination.current_page - this.onEachSide
    }
  },
  methods: {
    loadPage (page) {
      this.$emit(`${this.eventPrefix}change-page`, page)
    },
    isCurrentPage (page) {
      return page === this.tablePagination.current_page
    },
    setPaginationData (tablePagination) {
      this.tablePagination = tablePagination
      // преобразуем полученные данные в число
      this.tablePagination.per_page = Number(tablePagination.per_page)
      this.tablePagination.current_page = Number(tablePagination.current_page)
      this.tablePagination.total = Number(tablePagination.total)
    },
    resetData () {
      this.tablePagination = null
    }
  }
}
</script>

<style lang="scss">
.pagination {
  .page-item.active {
    color: #fff;
    background-color: #62a8ea;
    border-color: #62a8ea;
  }
}
</style>
