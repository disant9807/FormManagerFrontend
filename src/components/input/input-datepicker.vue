<template>
  <div
    v-on-clickaway="closeDatePicker"
    @click.stop="openDatePicker"
  >
    <date-picker
      v-model="dateSelected"
      is-expanded
      is-double-paned
      show-caps
      title-position="center"
      title-transition="none"
      weeks-transition="none"
      locale="ru"
      :attributes="attributes"
      :is-required="isRequired"
      :is-inline="isInline"
      :mode="datePickerMode"
      :min-date="minimalDate"
      :max-date="maximumDate"
      :popover-direction="popoverDirection"
      :popover-align="popoverAlign"
      :popover-visibility="datePickerVisibility"
      :show-day-popover="false"
      :update-on-input="true"
      @input="onSelectDate"
    >
      <template v-slot="{ inputValue, updateValue }">
        <masked-input
          type="text"
          name="datePicker"
          date-selected="off"
          autocomplete="off"
          class="form-control"
          :class="[{ 'is-invalid': isValid }, {'form-control-sm': isSmall}].concat(classInput)"
          :placeholder="inputPlaceholder"
          placeholder-char="_"
          :value="inputValue"
          :guide="true"
          :mask="maskedDate"
          :pipe="createAutoCorrectedDatePipe('dd.mm.yyyy')"
          :keep-char-positions="true"
          @change="onUpdateValue($event.target.value, updateValue)"
          @click.prevent="openDatePicker"
          @keydown.tab="closeDatePicker"
        />
        <font-awesome-icon
          v-if="dateSelected && !isRequired"
          class="input-datepicker__icon"
          icon="times"
          @click="clear"
        />
      </template>
    </date-picker>
  </div>
</template>

<script>
import { DatePicker, setupCalendar } from 'v-calendar'
import { formatDate } from '@/assets/js/helpers'
import { isValid as isValidDate, toDate, isDate, parseISO } from 'date-fns'
import 'v-calendar/lib/v-calendar.min.css'
import MaskedInput from 'vue-text-mask'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

setupCalendar({
  firstDayOfWeek: 2 // Monday,
})

export default {
  name: 'InputDatepicker',
  components: {
    DatePicker,
    MaskedInput
  },
  props: {
    value: {
      /*
        * Дата может передаваться:
         * 1) строка или new Date (если isRanged: false)
         * 2) Объект, если isRanged: true
        * */
      type: [String, Date, Object],
      default: null
    },
    isRanged: {
      /*
        * Определяет режим работы DatePicker
        * True - позволяет выбрать начальную и конечную дату
        * False - позволяет выбрать только один день
        * */
      type: [Boolean],
      default: false
    },
    popoverAlign: {
      /*
        * Определяет расположение дропдауна календаря
        * Left, Right, Center
        * */
      type: [String],
      default: 'center'
    },
    placeholder: {
      /*
        * Placeholder для инпута. Если его нету, выводим стандартный дд.мм.гггг
        * Условия смотрите в computed: inputPlaceholder()
        * */
      type: [String],
      default: ''
    },
    isValid: {
      type: Boolean,
      default: false
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    minDate: {
      type: [ Date, String ],
      default: undefined
    },
    maxDate: {
      type: [ Date, String ],
      default: undefined
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    isInline: {
      type: Boolean,
      default: false
    },
    classInput: {
      type: [String, Array],
      default: () => []
    }
  },
  data () {
    return {
      attributes: [
        {
          key: 'today',
          highlight: {
            backgroundColor: 'rgb(98, 168, 234)'
          },
          contentStyle: {
            color: '#fafafa'
          },
          dates: new Date()
        }
      ],
      datePickerVisibility: 'hidden',
      // Приводим строку или дату к нормальному виду
      dateSelected: this.checkDate(this.value),
      minimalDate: undefined,
      maximumDate: undefined,
      createAutoCorrectedDatePipe,
      popoverDirection: 'bottom'
    }
  },
  computed: {
    datePickerMode () {
      return this.isRanged ? 'range' : 'single'
    },
    inputPlaceholder () {
      return this.placeholder ? this.placeholder
        : this.isRanged ? 'дд.мм.гггг - дд.мм.гггг' : 'дд.мм.гггг'
    }
  },
  watch: {
    minDate () {
      this.setMinMaxDate()
    },
    value (value) {
      this.dateSelected = this.checkDate(value)
    }
  },
  mounted () {
    this.setMinMaxDate()
    if (this.isInline) {
      this.datePickerVisibility = 'visible'
    }
  },
  methods: {
    setMinMaxDate () {
      if (this.minDate) {
        this.minimalDate = this.convertDateString(this.minDate)
      }
      if (this.maxDate) {
        this.maximumDate = this.convertDateString(this.maxDate)
      }
    },
    convertDateString (date) {
      /*
      * Функция преобразовывания строки в дату.
      * 1) Преобразовываем строку регуляркой в массив
      * 2) Если длинна массива состоит МЕНЬШЕ ЧЕМ из 3х частей, проверяем значение на валидность Даты
      * (Это на случай, если нам передали DateStamp)
      * Если длина массива состоит из 3х частей, идем к шагу 3
      * 3) Если длина первыого элемента массива равна 4 - это год. Соединяем '-'
      * иначе меняем местами
      * */

      /*
      * Проверяем является ли date экземпляром объекта Date
      * */
      if (isDate(date)) return date

      const regexSplitDate = /[./-]/
      const array = date.split(regexSplitDate)

      if (array.length < 3) {
        return isValidDate(new Date(+date)) ? toDate(new Date(+date)) : null
      }

      const result = array[0].length === 4
        ? array.join('-')
        : array.reverse().join('-')

      return parseISO(result)
    },
    convertDateRange (data) {
      let obj = data
      /*
      * Форматируем в объекте каждое значение в нужный формат даты.
      * */
      Object.entries(obj).forEach(([key, value]) => {
        obj[key] = this.isDateValid(value)
      })
      return obj
    },
    isDateValid (value) {
      // if ( value && isValidDate(new Date(value)) ) {
      //   console.log('isDateValid', value, value.split(/[-.,/]/))
      // }
      // return
      /*
      * Проверяем валидность даты
      * */
      if (!value) return null
      return isValidDate(new Date(value))
        ? toDate(new Date(value))
        : this.convertDateString(value)
    },

    checkDate (value) {
      return this.isRanged ? this.convertDateRange(value) : this.isDateValid(value)
    },
    onSelectDate (value) {
      const emittedDate = this.isRanged
        ? value
        : isDate(value) ? formatDate(value, 'yyyy-MM-dd') : null
      this.$emit('input', emittedDate)
    },
    onUpdateValue (value, updateValue) {
      const regex = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/
      let isValidRegex

      /*
        * Сначала проверяем режим datePicker: RANGE или SINGLE
        * В mode Range функция получает сроку типа 22.03.2019 - 30.04.2019
        * Нам нужно разделить ее на массив, регуляркой убираем пробелы и дефисы
        * После чего мы ищем ХОТЯ БЫ 1 элемент (Array some), который не проходит проверку
        *
        * Если mode Single. Мы просто проверяем регуляркой и возвращаем true или false
        * */
      // TODO: Какой-то непонятный код. Исправить.
      isValidRegex = this.isRanged
        ? !value.replace(/\s+/g, '')
          .split('-')
          .some(item => regex.test(item) === false)
        : isValidRegex = regex.test(value)

      /*
        * Если значение ВАЛИДНО, мы меняем дату в дейтпикере (с помощью функции v-calendar - updateValue ).
        * В противном случае мы возвращаем FALSE и дейтпикер записывает последнее валидное значение.
        * */
      return isValidRegex
        ? updateValue(value, { formatInput: true, hidePopover: false })
        : false
    },
    openDatePicker (event) {
      if (this.isInline) return
      if (this.datePickerVisibility === 'hidden') this.datePickerVisibility = 'focus'

      this.popoverDirection = event.y > event.view.innerHeight / 2 ? 'top' : 'bottom'
    },
    closeDatePicker () {
      if (this.isInline) return
      this.datePickerVisibility = 'hidden'
    },
    maskedDate () {
      /*
        * Маска для mode RANGE и SINGLE
        * по-умолчаню функция принимает аргумент rawValue
        * */
      return this.isRanged
        ? [/\d/, /\d/, '.', /\d/, /\d/, '.', /[1-2]/, /[0,9]/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, '.', /\d/, /\d/, '.', /[1-2]/, /[0,9]/, /\d/, /\d/]
        : [/\d/, /\d/, '.', /\d/, /\d/, '.', /[1-2]/, /[0,9]/, /\d/, /\d/]
    },
    clear () {
      this.dateSelected = ''
      this.closeDatePicker()
      this.onSelectDate()
    }
  }
}
</script>
<style lang="scss">
  .input-datepicker {
    &__icon {
      position: absolute;
      top: 10.5px;
      right: 14px;
      cursor: pointer;
    }
  }
</style>
