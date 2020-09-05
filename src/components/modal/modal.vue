<template>
  <transition
    name="fade"
    mode="in-out"
  >
    <div class="modal">
      <div class="modal__wrap">
        <div
          v-on-clickaway="onCloseModal"
          class="modal__block"
        >
          <div class="modal__header">
            <div class="flex justify-content-between align-items-center">
              <h5 class="m-0">
                {{ title }}
              </h5>
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
  name: 'Modal',
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
    }
  }
}
</script>
