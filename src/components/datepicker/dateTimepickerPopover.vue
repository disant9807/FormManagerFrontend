<template>
  <b-popover
    triggers="click"
    placement="bottom"
    fallback-placement="flip"
    :target="targetName"
    :container="targetName"
    @hide="onHide"
  >
    <date-timepicker
      v-model="date"
      class="mb-2"
      :min-date="minDate"
      :max-date="maxDate"
      @input="$emit('input', $event)"
    />
    <!--Submit button-->
    <div class="d-flex justify-content-between">
      <app-btn
        color="default"
        @click="$emit('cancel')"
      >
        Отмена
      </app-btn>
      <app-btn
        color="success"
        @click="submitDate"
      >
        Применить
      </app-btn>
    </div>
  </b-popover>
</template>

<script>
import dateTimepicker from '@/components/datepicker/dateTimepicker'

export default {
  name: 'DateTimepickerPopover',
  components: {
    dateTimepicker
  },
  props: {
    value: {
      type: [String, Date],
      default: ''
    },
    targetName: {
      type: String,
      required: true
    },
    minDate: {
      type: [ String, Date ],
      default: ''
    },
    maxDate: {
      type: [ Date, String ],
      default: undefined
    }
  },
  data () {
    return {
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
    onHide (event) {
      event.preventDefault()
    },
    submitDate () {
      this.$emit('change', this.date)
    }
  }
}
</script>
