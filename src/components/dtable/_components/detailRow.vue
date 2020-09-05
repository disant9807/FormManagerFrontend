<template lang="pug">
  div(@click="onClick")
    .inline.field
      label Name:
      span {{ rowData.name }}
    .inline.field
      label Name:
      span {{ rowData.email }}
    .inline.field
      label Name:
      span {{ rowData.nickname }}
    .inline.field
      label Name:
      span {{ rowData.gender }}
      .inline.field
      label Name:
      span {{ rowData.birthdate }}
</template>

<script>
export default {
  name: 'DetailRow',
  props: {
    rowData: {
      type: Object,
      require: true
    },
    rowIndex: {
      type: Number
    }
  },
  methods: {
    onClick (event) {
      console.log('detail-row: on-click', event.target)
    }
  }
}
</script>
