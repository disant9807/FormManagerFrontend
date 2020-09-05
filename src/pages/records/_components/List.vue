<template>
  <div class="d-flex justify-content-center">
    <div class="userList__panel panel shadow-sm rounded py-3 px-2">
      <router-view
        ref="component"
        :value-form="dataForm"
        @update="onUpdateDtable"
      />
      <dtable
        ref="dtable"
        api-url="api"
        :default-sort="sort"
        :fields="fields"
        :search-fields="searchField"
        @onAdd="openAdd"
        @rowClicked="onRowClicked"
      >
        <template #inputs="{ rowData }">
          <div class="userList__badge-list d-flex justify-content-between">
            <div
              v-for="(item, key) in rowData.inputFields"
              class="userList__badge badge badge-pill badge-primary m-1"
            >
              <template v-if="key <= 2">
                {{ item.name }} : {{ item.content }}
              </template>
            </div>
            <div
              v-if="rowData.inputFields.length > 2"
              class="userList__badge badge badge-pill badge-success m-1"
            >
              <font-awesome-icon
                icon="plus"
              />
              {{ rowData.inputFields.length - 3 }}
            </div>
          </div>
        </template>
      </dtable>
    </div>
  </div>
</template>

<script>
import dtable from '@/components/dtable'

export default {
  name: 'UserList',
  components: {
    dtable
  },
  data () {
    return {
      sort: {
        field: 'id',
        direction: 'desc'
      },
      searchField: [
        {
          type: 'button',
          name: 'Добавить человека',
          icon: 'plus',
          style: 'col-auto',
          color: 'success',
          action: 'onAdd'
        },
        {
          name: 'search_params',
          type: 'input',
          placeholder: 'Глобальный поиск'
        }
      ],
      fields: [
        {
          title: '#ID',
          name: 'id',
          sortField: 'id',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
          width: '100px'
        },
        {
          title: 'Дата добавления',
          name: 'pubDate',
          sortField: 'pubDate',
          width: '150px'
        },
        {
          title: 'Поля',
          name: '__slot:inputs'
        }
      ],
      dataForm: {}
    }
  },
  methods: {
    openAdd () {
      this.$router.push({ name: 'CardAdd', params: { add: true } })
    },
    onRowClicked (rowData) {
      this.$router.push({ name: 'Card', params: { add: true, id: rowData.id } })
    },
    onUpdateDtable () {
      this.$refs.dtable.fetchTableData()
    }
  }
}
</script>

<style lang="scss">
  .userList {
    &__panel {
      width: 100%;
      max-width: 1000px;
    }

    &__badge {
      overflow: hidden;
      max-width: 150px;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }

    &__badge-list {
      width: 100%;
      max-width: 510px;
    }
  }
</style>
