<template>
  <transition name="modal-fade">
    <div class="modal">
      <div class="modal__wrap">
        <div class="modal__block">
          <div class="modal__header">
            <div class="flex justify-content-between align-items-center">
              <h5 class="m-0 text-dark">
                {{ title }}
              </h5>
              <div
                class="btn btn-xs text-gray"
                @click="onCloseModal"
              >
                &#x2716;
              </div>
            </div>
          </div>
          <div class="modal__content">
            <slot name="content" />
            <nav>
              <slot name="buttons" />
            </nav>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalForm',
  props: {
    isModalShown: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Сообщение'
    }
  },
  mounted () {
    document.addEventListener('keydown', this.onEscPress)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.onEscPress)
  },
  methods: {
    onEscPress (e) {
      if (e.keyCode === 27) {
        this.$emit('close')
      }
    },
    onCloseModal () {
      this.$emit('close')
    },
    deleteFile () {
      this.$emit('delete')
    }
  }
}
</script>

<style lang="scss">
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
</style>
