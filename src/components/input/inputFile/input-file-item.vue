<template>
  <div class="form-row mb-2">
    <div class="col-auto">
      <div
        class="btn"
        :class="'btn-' + color"
      >
        <font-awesome-icon
          :icon="icon"
          size="lg"
        />
      </div>
    </div>
    <div class="col d-flex flex-column overflow-hidden">
      <span class="text-truncate">{{ file.name }}</span>
      <small>{{ size }}</small>
    </div>
    <div class="col-auto">
      <div
        class="btn btn-danger"
        title="Удалить"
        @click="$emit('onDeleteFile')"
      >
        <font-awesome-icon icon="trash-alt" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputFileItem',
  props: {
    file: {
      type: [ Object, File ],
      required: true
    }
  },
  data () {
    return {
      icon: 'file-alt',
      color: 'primary',
      size: 0
    }
  },
  mounted () {
    this.checkFileType(this.file)
    this.size = this.formatBytes(this.file.size)
  },
  methods: {
    formatBytes (bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    checkFileType (file) {
      const extension = file.name.substr((file.name.lastIndexOf('.') + 1))
      const image = /(gif|jpg|jpeg|tiff|tif|png)$/ig
      const document = /(doc|docx|odt|ods|odp|pdf|ppt|pptx|txt|xls|xlsx)$/ig
      const archive = /(bz|bz2|rar|tar|zip|7z)$/ig
      const video = /(avi|mpeg|mov)$/ig

      if (image.test(extension)) {
        this.icon = 'file-image'
        this.color = 'warning'
      } else if (document.test(extension)) {
        switch (extension) {
          case 'doc':
          case 'docx':
          case 'odt':
            this.icon = 'file-word'
            this.color = 'primary'
            break
          case 'pdf':
            this.icon = 'file-pdf'
            this.color = 'danger'
            break
          case 'xls':
          case 'xlsx':
          case 'ods':
            this.icon = 'file-excel'
            this.color = 'success'
            break
          case 'ppt':
          case 'pptx':
          case 'odp':
            this.icon = 'file-powerpoint'
            this.color = 'warning'
            break
        }
      } else if (archive.test(extension)) {
        this.icon = 'file-archive'
        this.color = 'info'
      } else if (video.test(extension)) {
        this.icon = 'file-video'
        this.color = 'info'
      } else {
        this.icon = 'file-alt'
        this.color = 'primary'
      }
    }
  }
}
</script>
