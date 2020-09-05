<template>
  <div class="row">
    <div class="col">
      <div
        v-for="(obj, objIndex) in formUi"
        :key="objIndex"
        class="form-row"
      >
        <div
          v-for="(col, colIndex) in obj.row"
          :key="colIndex"
          :class="col.size"
        >
          <h5
            v-if="col.title"
            class="text-primary"
          >
            {{ col.title }}
          </h5>
          <transition name="fade">
            <form-constructor-field
              v-if="col.name && formSchema[col.name]"
              ref="formConstructorField"
              :key="col.name + '-' + colIndex"
              :key-input-id="col.name + '-' + colIndex"
              :class="col.class || ''"
              :settings="formSchema[col.name]"
              :form="form"
              :field-name="col.name"
              :v="formSchema[col.name].required && $v.innerForm && $v.innerForm[col.name] ? $v.innerForm[col.name] : null"
              @onChange="setForm(col.name, ...arguments)"
              @onClick="$emit($event)"
            >
              <slot
                v-for="slot in Object.keys($slots)"
                :slot="slot"
                :name="slot"
              />
            </form-constructor-field>
          </transition>

          <div v-if="col.slot">
            <slot :name="col.slot" />
          </div>
          <div v-if="col.row">
            <!--TODO: доделать рекурсивное возвращение и запись значений-->
            <form-constructor
              :form-ui="obj.row"
              :form-schema="formSchema"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formConstructorField from '@/components/formConstructor/formConstructorField'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'FormConstructor',
  components: {
    formConstructorField
  },
  props: {
    formUi: {
      type: Array,
      default: () => []
    },
    formSchema: {
      type: [ Array, Object ],
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      innerForm: {},
      form: this.value
    }
  },
  watch: {
    value (newValue) {
      /*
      * Если сверху приходит что угодно, но незаполненый объект - сбрасываем значения
      * */
      if (typeof newValue === 'object' && Object.keys(newValue).length) return

      this.form = {}
      this.validationReset()
    }
  },
  validations () {
    /*
    * Создаем динамическую валидацию
    * ВАЖНО! validations - это функция, а не объект, которая отслеживает динамические изменения
    * Мы строим валидацию на основании переменной innerForm в data
    * Если в PROPS schema есть обязательное поле (required: true), мы добавляем его в массив валидации для отслеживания
    * Если хоть одно из обязательных полей заполнено, то для других включается валидация.
    * */
    let v = {
      innerForm: {}
    }

    Object.entries(this.innerForm).forEach(([ key, value ]) => {
      if (this.isRequiredField(key)) {
        v.innerForm[key] = {
          required
        }

        if (this.formSchema[key].hasOwnProperty('schema') && Array.isArray(this.formSchema[key].schema) && this.formSchema[key].schema.length) {
          let validationSchemaObj = {}

          this.formSchema[key].schema.forEach(item => {
            if (item.hasOwnProperty('required') && item.required) {
              /*
              * TODO: сделать валидацию по условию. Передавать кастомные условия
              *  Например, минимальную длинну, или если другие обязательные поля обязательные
              * required: requiredIf((obj) => {
              *   return Object.values(obj).some(objVal => !!objVal)
              * })
              * */
              this.$set(validationSchemaObj, item.name, { required })
            }
          })

          v.innerForm[key] = {
            required: required,
            $each: {
              ...validationSchemaObj
            }
          }
        }
      }
    })

    return v
  },
  methods: {
    isRequiredField (key) {
      return (this.formSchema.hasOwnProperty(key) && this.formSchema[key].hasOwnProperty('required') && this.formSchema[key].required) ||
             (this.formSchema[key].hasOwnProperty('schema') && this.formSchema[key].schema.some(item => item.hasOwnProperty('required')) && this.innerForm[key].length)
    },
    setForm (key, value, fullValue = '') {
      const resultValue = value === null || value === undefined
        ? ''
        : value

      if (this.formSchema.hasOwnProperty(key)) {
        /*
        * Для объекта валидации
        * */
        this.$set(this.innerForm, key, fullValue)
      }

      if (Array.isArray(resultValue)) {
        /*
        * Если это массив и уже имеются данные элементы с данным ключем (item[0], item[1]), то удалем их
        * Чтобы потом записать новый массив в итоговый
        * TODO: придумать более красивое решение
        * TODO: Пустые поля не должны удаляться. В каком поле заполняется значение, в тот индекс и записываем
        * TODO: Сначала удалить все, а потом записать значения - такой вид записи допустимо.
        * */
        Object.keys(this.form).forEach(objKey => {
          if (objKey.split('[')[0] === key) delete this.form[objKey]
        })

        resultValue.forEach((item, index) => {
          if (typeof item === 'object') {
            Object.entries(item).forEach(([itemKey, itemValue]) => {
              // 11.02.2020 добавил проверку если от компонента в данных поля вернется вложеный объект(как fileUploadModel тип файла) { label: '', value: ' } или { name: '', id: '' }
              // this.$set(this.form, key + `[${index}][${itemKey}]`, itemValue)
              this.$set(
                this.form,
                key + `[${index}][${itemKey}]`,
                typeof itemValue === 'object' && (itemValue.hasOwnProperty('value') || itemValue.hasOwnProperty('id')) ? itemValue.value || itemValue.id : itemValue)
            })
          } else {
            this.$set(this.form, key + `[${index}]`, item)
          }
        })
      } else {
        this.$set(this.form, key, resultValue)
      }

      this.$emit('input', this.form)
      this.$emit('onSetFullForm', this.innerForm)
    },
    validation (bool = true) {
      /*
      * передав аргумент false, можно выключить уведомление в тостер
      * Например, если у вас несколько конструкторов форм на одной странице и одна кнопка проверки валидации
      * В таком случае Тостер можно вызывать на самой странице
      * */
      this.$v.innerForm.$touch()
      this.$emit('onValidate', this.$v.innerForm.$invalid)
      if (this.$v.innerForm.$invalid && bool) {
        this.$store.dispatch('writeMessage', {
          message: 'Заполните обязательные поля',
          type: 1
        })
      }
    },
    validationReset () {
      /*
      * Сначала сбрасываем значения
      * Потом записываем дефолтные в каждую форму
      * На последнем этапе сбрасываем валидацию, чтобы не подсвечивались пустые поля
      * */
      this.innerForm = {}
      this.form = {}
      this.$refs.formConstructorField.forEach(item => item.setDefaultValue())
      this.$nextTick(() => this.$v.$reset())
    }
  }
}
</script>
