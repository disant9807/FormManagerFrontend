<!--Внимание!-->
<template>
  <div class="dateTimePicker">
    <!--DatePicker-->
    <input-datepicker
      :value="date"
      :min-date="minDate"
      :max-date="maxDate"
      is-inline
      is-required
      placeholder="Выберите дату"
      @input="onChangeDate"
    />
    <!--Time input-->
    <div class="d-flex flex-column align-items-center justify-content-center">
      <span class="mr-1">
        Время
      </span>

      <div class="d-flex align-items-center justify-content-center">
        <div>
          <input
            v-model="time"
            class="dateTimePicker__datetime form-control"
            @input="onChangeTime"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inputDatepicker from '@/components/input/input-datepicker'
import { isValid, parseISO } from 'date-fns'
import { formatDate } from '@/assets/js/helpers'
import Inputmask from 'inputmask'

export default {
  name: 'DateTimepicker',
  components: {
    inputDatepicker
  },
  props: {
    value: {
      type: [ String, Date ],
      default: null
    },
    minDate: {
      type: [ String, Date ],
      default: null
    },
    maxDate: {
      type: [ String, Date ],
      default: null
    }
  },
  data () {
    return {
      date: null,
      time: ''
    }
  },
  watch: {
    value () {
      this.setDateAndTime()
    }
  },
  mounted () {
    this.setDateAndTime()

    const inputTime = this.$el.querySelector('.dateTimePicker__datetime')

    Inputmask('datetime', {
      inputFormat: 'HH:MM',
      max: 24,
      placeholder: '0'
    }).mask(inputTime)
  },
  methods: {
    onChangeDate (value) {
      this.date = value
      this.$emit('input', value + ' ' + this.time)
    },
    onChangeTime () {
      this.$emit('input', this.date + ' ' + this.time)
    },
    setDateAndTime () {
      let currentDate = isValid(parseISO(this.value)) ? parseISO(this.value) : new Date()

      this.date = formatDate(currentDate, 'yyyy-MM-dd')
      this.time = formatDate(currentDate, 'HH:mm')

      this.$emit('input', this.date + ' ' + this.time)
      // this.$emit('input', formatDate(currentDate, 'yyyy-MM-dd') + ' ' + formatDate(currentDate, 'HH:mm'))
    }
  }
}
</script>

<style lang="scss">
.dateTimePicker {
  position: relative;

  & .c-pane-container {
    /* stylelint-disable */
    /* Выключили stylelint, так как библиотека стили прописывает inline и перезаписывает наши */
    background-color: transparent !important;
    border-color: transparent !important;
    /* stylelint-enable */
  }

  input {
    padding: 5px;
    width: 53px;
    max-width: unset;
    font-size: 14px;
    color: #2a2c2d;
  }

  /* 'X' button for resetting/clearing time */
  input[type=time]::-webkit-clear-button {
    display: none;
  }

  /* Up/Down arrows for incrementing/decrementing the value */
  input[type=time]::-webkit-inner-spin-button {
    display: none;
  }
}
</style>
