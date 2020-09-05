<!--События ok, close, cancel по умолчанию закрывают текущее модальное окно => решение обработать событие и запретить закрытие bvModalEvt.preventDefault()-->
<template>
  <b-modal
    :id="id"
    :title="title"
    centered
    header-bg-variant="light"
    header-text-variant="dark"
    header-border-variant="default"
    header-close-variant="gray"
    body-bg-variant="white"
    :hide-footer="hideFooter"
    :hide-backdrop="true"
    :no-close-on-backdrop="noCloseOnBackdrop"
    :scrollable="false"
    :tall="true"
    :dialog-class="dialogClass"
    :no-close-on-esc="noCloseOnEsc"
    :hide-header-close="hideHeaderClose"
    :size="size"
    @close="$emit('close', $event)"
    @shown="$emit('shown', $event)"
    @hidden="$emit('hidden', $event)"
  >
    <slot
      v-for="slot in Object.keys($slots)"
      :slot="slot"
      :name="slot"
    />
    <template slot="modal-footer">
      <app-btn
        color="default"
        @click="onCancel"
      >
        Отмена
      </app-btn>
      <app-btn
        :color="okVariant"
        :loading="loading"
        :disabled="okDisabled"
        @click="$emit('ok', $event)"
      >
        {{ okTitle }}
      </app-btn>
    </template>
  </b-modal>
</template>

<script>

export default {
  name: 'ModalFormBootstrap',
  props: {
    id: {
      type: String,
      default: 'newModal'
    },
    title: {
      type: String,
      required: true
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    okVariant: {
      type: String,
      default: 'success'
    },
    okTitle: {
      type: String,
      default: 'Сохранить'
    },
    dialogClass: {
      type: String,
      default: 'default-dialog-width'
    },
    loading: {
      type: Boolean,
      default: false
    },
    okDisabled: {
      type: Boolean,
      default: false
    },
    noCloseOnEsc: {
      /*
      * Отмена закрытия модального окна при нажатии на esc(передать true, по умолчанию закрывается)
      * */
      type: Boolean,
      default: false
    },
    hideHeaderClose: {
      /*
      * Скрыть крестик закрытия (передать true, по умолчанию виден)
      * */
      type: Boolean,
      default: false
    },
    noCloseOnBackdrop: {
      /*
      * Закрытие модалки кликом в любой области (по умолчанию отключено)
      * */
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  methods: {
    onCancel (event) {
      this.$bvModal.hide(this.id)

      this.$emit('cancel', event)
      this.$emit('close', event)
    }
  }
}
</script>

<style lang="scss">
  .default-dialog-width {
    max-width: 600px;
  }

  .lg-dialog-width {
    max-width: 1000px;
  }

  .modal-header {
    padding-top: 11px;
    padding-bottom: 11px;

    .close {
      margin-top: -11px;
      margin-bottom: -11px;
      padding-top: 15px;
      padding-bottom: 11px;
    }
  }

  .modal-content {
    border: none;
  }

  .modal-body {
    padding-bottom: 0;
  }

  .modal-footer {
    padding-top: 0;
    border: none;
  }
</style>
