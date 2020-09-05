<template>
  <div
    :id="targetId"
    v-on-clickaway="closeDatePicker"
    class="input-group"
  >
    <div
      class="form-control cursor-pointer"
      :class="{ 'is-invalid': isValid }"
      @click="openDatePicker"
    >
      <span v-show="date">{{ date | formatDate }}</span>
      <span
        v-show="!date"
        class="text-placeholder"
      >{{ placeholder }}</span>
    </div>
    <div class="input-group-append">
      <app-btn
        :color="isValid ? 'danger' : 'default'"
        title="Очистить"
        @click="clearDate"
      >
        <font-awesome-icon icon="times" />
      </app-btn>
    </div>
    <date-timepicker-popover
      v-if="isOpen"
      :value="date"
      :target-name="targetId"
      :max-date="maxDate"
      :min-date="minDate"
      @change="handleSubmit"
      @cancel="closeDatePicker"
    />
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/helpers'
import dateTimepickerPopover from '@/components/datepicker/dateTimepickerPopover'

export default {
  name: 'InputDatepicker',
  components: {
    dateTimepickerPopover
  },
  filters: {
    formatDate (date) {
      if (date) {
        return formatDate(date, 'dd.MM.yyyy HH:mm')
      }
    }
  },
  props: {
    isValid: {
      type: Boolean,
      default: false
    },
    minDate: {
      type: [ Date, String ],
      default: ''
    },
    maxDate: {
      type: [ Date, String ],
      default: ''
    },
    placeholder: {
      /*
        * Placeholder для инпута. Если его нету, выводим стандартный дд.мм.гггг
        * Условия смотрите в computed: inputPlaceholder()
        * */
      type: [String],
      default: ''
    },
    targetId: {
      type: String,
      required: true
    },
    value: {
      /*
        * Дата может передаваться:
         * 1) строка или new Date (если isRanged: false)
         * 2) Объект, если isRanged: true
        * */
      type: [String, Date, Object],
      default: null
    }
  },
  data () {
    return {
      // Приводим строку или дату к нормальному виду
      isOpen: false,
      date: ''
    }
  },
  watch: {
    value (value) {
      this.date = value
    }
  },
  mounted () {
    this.date = this.value
  },
  methods: {
    openDatePicker () {
      this.isOpen = true
    },
    closeDatePicker () {
      this.isOpen = false
    },

    handleSubmit (date) {
      this.$emit('input', date)
      this.date = date
      this.isOpen = false
    },
    clearDate () {
      this.isOpen = false
      if (this.date) {
        this.date = ''
        this.$emit('input', this.date)
      }
    }
  }
}
</script>
