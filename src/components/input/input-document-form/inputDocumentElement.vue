<template>
  <div
    class="form-row"
    :class="{ 'mb-2': docIndex < arrayLength - 1 }"
  >
    <div class="col-6">
      <input-file-icon
        :is-label="false"
        :input-id="`document_${docIndex}`"
        placeholder="Название документа"
        file-type="\.(jpg|JPG|png|gif|GIF)$"
        @getInputText="$emit('change', 'name', $event)"
        @getInputFile="$emit('change', 'files', $event)"
      />
    </div>
    <div class="col">
      <input-select
        placeholder="Тип документа"
        track-by="label"
        url="nomenclature/files/get"
        :url-data="{types: true}"
        :options="fileOption"
        :preselect-first="true"
        @getOption="fileOption = $event"
        @select="$emit('change', 'type', $event.value)"
      />
    </div>
    <!--Кнопки Добавить\Удалить-->
    <div class="col-auto">
      <div
        v-if="!docIndex"
        class="btn btn-success"
        @click="$emit('onAdd')"
      >
        <font-awesome-icon icon="plus" />
      </div>
      <div
        v-else
        class="btn btn-danger"
        @click="$emit('onDelete')"
      >
        <font-awesome-icon icon="minus" />
      </div>
    </div>
  </div>
</template>

<script>
import inputFileIcon from '@/components/input/input-file-icon'
import inputSelect from '@/components/input/input-select'

export default {
  name: 'NomenclatureDocumentForm',
  components: {
    inputFileIcon,
    inputSelect
  },
  props: {
    arrayLength: {
      type: Number,
      required: true
    },
    doc: [ String, Number, Object ],
    docIndex: {
      type: Number,
      required: true
    },
    value: {
      type: Array,
      default () {
        return [
          {
            name: '',
            type: 1,
            files: ''
          }
        ]
      }
    }
  },
  data () {
    return {
      fileOption: [{ value: 1, label: 'Инструкция' }] // Список типов файлов
    }
  }
}
</script>
