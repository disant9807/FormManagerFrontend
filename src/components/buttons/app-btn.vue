<!--tooltip(стандартный) props -> title='Текст тултипа'-->
<!--b-tooltip для включения props -> disableTooltip=false(по дефолту отключен).-->
<!--b-tooltip для изменения фона props -> tooltipBG='danger'(по дефолту отключен). Можно передать стандартные bootstrap class-->
<!--b-tooltip ВНИМАНИЕ!!! если несколько раз используется компонент на странице задать props -> targetId=id(уникальный, для корректной работы b-tooltip)-->
<template>
  <div
    :id="targetId"
    :title="title"
    :class="[
      { 'btn': !text },
      buttonColor,
      { 'btn-xs': xSmall },
      { 'btn-sm': small },
      { 'btn-lg': large },
      { 'disabled': disabled || loading },
      { 'rounded-0': square },
      { 'rounded-circle circle-padding': circle }
    ]"
    class="app-btn-wrap"
    tabindex="0"
    @keydown.enter="onClick"
    @click="onClick"
  >
    <div style="position: relative;">
      <!--Иначе спиннер выйдет за пределы кнопки-->
      <div
        v-if="loading && !disabled && !text"
        class="btn-spinner active"
        :class="'bg-' + color"
      >
        <font-awesome-icon
          :icon="['fad', 'spinner']"
          spin
        />
      </div>
      <slot />
    </div>
    <b-tooltip
      v-if="targetId && title"
      :disabled.sync="tooltipState"
      :target="targetId"
      :variant="tooltipBG !== 'default' ? tooltipBG : ''"
      :container="targetId"
      noninteractive
      triggers="hover"
    >
      <!--ВАЖНО! Если tooltip из 2х строк, а не 1, уберите position: relative из родительского элемента-->
      {{ title }}
    </b-tooltip>
  </div>
</template>

<script>
export default {
  name: 'AppBtn',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    xSmall: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disableTooltip: {
      // b-tooltip
      type: Boolean,
      default: false
    },
    targetId: {
      // Id для b-tooltip
      type: [String, Number],
      default: ''
    },
    title: {
      // Текст tooltip
      type: String,
      default: ''
    },
    tooltipBG: {
      // Фон для b-tooltip
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      tooltipState: false
    }
  },
  computed: {
    buttonColor () {
      if (this.text) {
        return 'btn-text-' + this.color
      } else if (this.outline) {
        return 'btn-outline-' + this.color
      } else {
        return 'btn-' + this.color
      }
    }
  },
  watch: {
    disableTooltip () {
      this.setDisableState()
    }
  },
  mounted () {
    this.setDisableState()
  },
  methods: {
    setDisableState () {
      if (this.targetId) {
        this.tooltipState = this.disableTooltip
      }
    },
    onClick () {
      if (this.loading || this.disabled) return

      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
  .btn-spinner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {
    &.circle-padding {
      padding: 0.475rem 0.75rem;
    }
  }

  .app-btn-wrap {
    outline: none;
  }
</style>
