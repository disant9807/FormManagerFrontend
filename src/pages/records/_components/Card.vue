<template>
  <card-modal
    scrollable
    @close="onCloseForm"
  >
    <div class="d-flex justify-content-end mb-2">
      <card-modal-button
        v-if="$route.meta.add"
        theme="success"
        @click="save"
      >
        Сохранить
      </card-modal-button>
      <card-modal-button
        v-else
        theme="danger"
        @click="deleteForm"
      >
        Удалить
      </card-modal-button>
    </div>
    <card-modal-container class="shadow">
      <form-constructor
        ref="form"
        v-model="formData"
        :form-schema="formSchema"
        :form-ui="formUI"
        @onValidate="handleValidate"
      />
    </card-modal-container>
  </card-modal>
</template>

<script>
import cardModalButton from '../../../components/cardModal/body/cardModalButton'
import formConstructor from '../../../components/formConstructor/formConstructor'
import cardModal from '../../../components/cardModal/cardModal'
import cardModalContainer from '../../../components/cardModal/body/cardModalContainer'
import api from '@/pages/records/_api'

export default {
  name: 'IndexVue',
  components: {
    formConstructor,
    cardModal,
    cardModalContainer,
    cardModalButton
  },
  data () {
    return {
      formSchema: {
        name: {
          default: '',
          label: 'Имя',
          placeholder: 'Иван',
          required: true,
          type: 'inputRegex'
        },
        surname: {
          default: '',
          label: 'Фамилия',
          placeholder: 'Иванов',
          required: true,
          type: 'inputRegex'
        },
        middleName: {
          default: '',
          label: 'Отчество (если имеется)',
          placeholder: 'Иванович',
          required: false,
          type: 'inputRegex'
        },
        description: {
          default: '',
          label: 'Описание человека',
          placeholder: 'Хороший, порядочный, всегда поможет...',
          required: false,
          type: 'textArea'
        },
        maritalStatus: {
          default: '',
          label: 'Семейное положение:',
          type: 'select',
          data: [
            { id: 0, name: 'Женат/Замужем' },
            { id: 1, name: 'Не женат/Не замужем' },
            { id: 2, name: 'Разведен/Разведена' }
          ]
        },
        perniciousHabits: {
          default: '',
          label: 'Вредные привычки',
          type: 'checkbox'
        },
        dateOfBirth: {
          default: '',
          label: 'Дата рождения',
          type: 'datepicker'
        }
      },
      formUI: [
        {
          row: [
            {
              name: 'name',
              size: 'col-6'
            },
            {
              name: 'surname',
              size: 'col-6'
            }
          ]
        },
        {
          row: [
            {
              name: 'middleName',
              size: 'col-12'
            }
          ]
        },
        {
          row: [
            {
              name: 'maritalStatus',
              size: 'col-6'
            },
            {
              name: 'dateOfBirth',
              size: 'col-6'
            }
          ]
        },
        {
          row: [
            {
              name: 'description',
              size: 'col-12'
            }
          ]
        },
        {
          row: [
            {
              name: 'perniciousHabits',
              size: 'col-12'
            }
          ]
        }
      ],
      formData: {},
      isInvalid: true
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.getDataForm(this.$route.params.id)
    }
  },
  methods: {
    onCloseForm () {
      this.$router.push({ name: 'dataRecords' })
    },
    save () {
      this.$refs.form.validation()
      if (this.isInvalid) return

      api.save(this.formData)
        .then(({ data }) => {
          if (data.error === false) {
            this.$store.dispatch('writeMessage', {
              message: 'Сохранение данных успешно завершено!',
              type: 0
            })
            this.$emit('update')
            this.onCloseForm()
          } else {
            this.$store.dispatch('writeMessage', {
              message: 'Ошибка сохранения данных!',
              type: 1
            })
          }
        })
    },
    deleteForm () {
      api.delete(this.$route.params.id)
        .then(({ data }) => {
          if (data.error === false) {
            this.$store.dispatch('writeMessage', {
              message: 'Удаление данных успешно завершено!',
              type: 0
            })
            this.$emit('update')
            this.onCloseForm()
          } else {
            this.$store.dispatch('writeMessage', {
              message: 'Ошибка удаления',
              type: 1
            })
          }
        })
    },
    setDataForm (valueForm) {
      Object.entries(valueForm).forEach(([ key, value ]) => {
        if (this.formSchema[key]) { this.formSchema[key].default = value }
      })
    },
    normalizeData (data) {
      let valueForm = {}
      if (data.inputFields) {
        data.inputFields.forEach(item => {
          valueForm[item.name] = item.content
        })
      }
      return valueForm
    },
    getDataForm (id) {
      api.getForm(id)
        .then(({ data }) => {
          this.setDataForm(this.normalizeData(data))
        })
    },
    handleValidate (bool) {
      this.isInvalid = bool
    }
  }
}
</script>

<style scoped>

</style>
