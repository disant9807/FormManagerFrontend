<template>
  <div class="flex align-items-center">
    <template v-for="(name, nameIndex) in fieldNameArr">
      <div
        v-if="isSpecialField(name)"
        :key="nameIndex"
        :class="{ 'mr-1': !isLastIndex(nameIndex) }"
      >
        <!--SEQUENCE-->
        <span v-if="extractName(name) === '__sequence'">{{ renderSequence(rowIndex) }}</span>
        <!--AVATAR OR PHOTO-->
        <span
          v-if="extractName(name) === '__avatar' || extractName(name) === '__photo'"
          class="avatar avatar--medium"
          :class="[ extractName(name) === '__avatar' ? 'avatar--round' : 'rounded' ]"
        >
          <app-img-lazy
            v-if="getObjectValue(data, extractArgs(name), '')"
            :src="url + getObjectValue(data, extractArgs(name), '')"
            :class="[ extractName(name) === '__avatar' ? 'rounded-circle' : 'rounded' ]"
          />
          <template v-else>
            <font-awesome-icon
              v-if="extractName(name) === '__avatar'"
              icon="user-circle"
              size="2x"
              class="rounded-circle"
            />
            <font-awesome-icon
              v-else
              :icon="['far', 'camera-retro']"
              class="rounded"
            />
          </template>
        </span>
        <!--Ссылка (пример: [link])-->
        <div
          v-if="extractName(name) === '__link'"
          class="pl-2"
        >
          <a
            target="_blank"
            :href="url + getDeepObjectValue(data, extractArgs(name), 'value')"
            @click.stop
          >
            {{ `[${getDeepObjectValue(data, extractArgs(name), 'label')}]` }}
          </a>
          <span class="ml-2">{{ getDeepObjectValue(data, extractArgs(name), 'text') }}</span>
        </div>
        <!--BADGE-->
        <span
          v-if="extractName(name) === '__badge'"
          class="badge"
          :class="['badge-' + getDeepObjectValue(data, extractArgs(name), 'color') || 'primary']"
        >{{ getDeepObjectValue(data, extractArgs(name), 'label') }}</span>
        <!--DATE-->
        <span v-if="extractName(name) === '__date'">
          {{ getObjectValue(data, extractArgs(name)) | formatDate }}
        </span>
        <!--TIME-->
        <span v-if="extractName(name) === '__time'">
          {{ getObjectValue(data, extractArgs(name)) | formatTime }}
        </span>
        <!--ARRAY-->
        <div v-if="extractName(name) === '__array'">
          <span
            v-for="(val, valIndex) in getArrayData(extractArgs(name))"
            :key="valIndex"
          >
            <a
              v-if="val.link"
              :href="val.link"
              @click.stop
            >{{ val.name }}</a>
            <span
              v-else
            >{{ val.name }}</span>
            <span
              v-if="valIndex !== getArrayData(extractArgs(name)).length - 1"
            >, </span>
          </span>
        </div>
        <!--SUM-->
        <span v-if="extractName(name) === '__sum'">
          {{ getObjectValue(data, extractArgs(name)) | numberWithSpaces }}
        </span>
        <!--SHORT FIO-->
        <span v-if="extractName(name) === '__shortFio'">
          {{ getObjectValue(data, extractArgs(name)) | shortusername }}
        </span>
      </div>
      <template v-else>
        <span
          v-if="hasCallback(field)"
          :key="nameIndex"
          :class="field.dataClass"
          v-html="callCallback(field, data)"
        />
        <span
          v-else
          :key="nameIndex"
        >{{ getObjectValue(data, name, '') }}</span>
      </template>
    </template>
  </div>
</template>

<script>
import appImgLazy from '@/components/app-img-lazy'
import { formatDate } from '@/assets/js/helpers'
import { isDate } from 'date-fns'

export default {
  name: 'DtableCell',
  components: {
    appImgLazy
  },
  filters: {
    formatDate (date) {
      if (!date || date === '0000-00-00 00:00:00' || date === '0000-00-00') return

      let resultDate = date.replace(/ /g, 'T')

      return formatDate(resultDate, 'dd.MM.yyyy')
    },
    formatTime (time) {
      if (!time) return
      if (isDate(time)) return formatDate(time, 'HH:mm')

      const date = new Date()
      let hours, minutes, result

      if (/\s/.test(time) && /:/.test(time)) {
        const arr = time.split(' ')
        const timeValue = arr[1];
        [ hours, minutes ] = timeValue.split(':')
      } else if (/:/.test(time)) {
        [ hours, minutes ] = time.split(':')
      }

      if (hours && minutes) {
        result = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
      }

      return result ? formatDate(result, 'HH:mm') : ''
    },
    numberWithSpaces (sum) {
      if (sum) {
        const number = parseFloat(sum).toFixed(2)

        const parts = number.toString().split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

        return parts.join('.')
      }
    },
    shortusername (value) {
      if (!value) return

      const reg = value.replace(/[^a-яА-ЯёЁ]+/g, ' ').trim()
      const array = reg.split(' ')

      if (array.length < 2) return array[0]

      let result = `${array[0]} `

      for (let i = 1; i < array.length; i++) {
        if (i === array.length - 1) {
          result += `${array[i][0]}.`
        } else {
          result += `${array[i][0]}. `
        }
      }

      return result
    }
  },
  props: ['field', 'data', 'pagination', 'rowIndex'],
  data () {
    return {
      url: process.env.VUE_APP_API_URL
    }
  },
  computed: {
    fieldNameArr () {
      // Проверка наличия данных у поля 10.12.2019
      let checkedField = []
      this.field.name.split('*').forEach((field) => {
        let fieldName = this.extractArgs(field) || field
        if (this.data.hasOwnProperty(fieldName) || field === '__sequence') { checkedField.push(field) }
      })
      return checkedField
    }
  },
  methods: {
    isValidObjData (obj, path, key = '') {
      let bool = obj !== null && typeof obj[path] !== 'undefined' && obj[path] !== null

      if (key) {
        bool = obj[path] !== null && typeof obj[path][key] !== 'undefined' && obj[path][key] !== null && obj[path].hasOwnProperty(key)
      }
      return bool
    },
    renderSequence (index) {
      const paginationFrom = (this.pagination.current_page * this.pagination.per_page) - (this.pagination.per_page - 1)

      return this.pagination
        ? paginationFrom + index
        : index
    },
    getObjectValue (object, path, defaultValue) {
      defaultValue = (typeof defaultValue === 'undefined') ? null : defaultValue

      let obj = object

      if (path.trim() !== '') {
        const keys = path.split('.')
        keys.forEach((key) => {
          obj = this.isValidObjData(obj, path)
            ? obj[key]
            : defaultValue
        })
      }

      return obj
    },
    getDeepObjectValue (object, path, key) {
      return this.isValidObjData(object, path, key)
        ? object[path][key]
        : ''
    },
    getArrayData (fieldName) {
      let array = this.data[fieldName]

      if (array.length) {
        //  TODO: сделать проверку на виладность данных
      }

      return array
    },
    hasCallback (item) {
      return !!item.callback
    },
    callCallback (field, item) {
      if (!this.hasCallback(field)) return

      if (typeof (field.callback) === 'function') {
        return field.callback(this.getObjectValue(item, field.name))
      }

      return null
    },
    extractArgs (string) {
      return string.split(':')[1]
    },
    extractName (string) {
      return string.split(':')[0].trim()
    },
    isSpecialField (fieldName) {
      return fieldName.slice(0, 2) === '__'
    },
    isLastIndex (index) {
      return index === this.fieldNameArr.length - 1
    }
  }
}
</script>

<style lang="scss">
  .table-avatar {
    img {
      width: 30px;
      height: 30px;
      object-fit: cover;
    }
  }
</style>
