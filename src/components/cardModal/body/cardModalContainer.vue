<template>
  <div
    ref="container"
    :class="['cardContainer__container', `cardContainer_theme_${theme}`].concat(marginClass)"
    :style="{ 'height': ( !height ? 'auto' : height + 'px' ) }"
  >
    <div class="cardContent__text_l">
      {{ title }}
    </div>
    <div
      :class=" { 'cardContainer__scroll': scroll } "
      :style="{ 'height': ( !height ? 'auto' : heightInside + 'px' ) }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { TimelineLite } from 'gsap/TweenMax'

export default {
  name: 'CardContainer',
  props: {
    title: {
      type: String,
      default: ''
    },
    margin: {
      type: Array,
      default: () => []
    },
    eventOnAnim: {
      type: Boolean,
      default: false
    },
    theme: {
      type: [String, Boolean],
      default: false
    },
    scroll: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      tl: undefined,
      heightInside: ''
    }
  },
  computed: {
    marginClass () {
      let margin = this.margin.map(item => { return 'cardContent_' + item })
      return margin
    }
  },
  watch: {
    eventOnAnim () {
      this.animationAction()
    }
  },
  mounted () {
    this.tl = new TimelineLite()
    this.heightInside = this.height ? this.height - 40 : 0
  },
  methods: {
    animationMounted () {
      let thisHeight = this.$refs.container.clientHeight + 200

      this.tl.set(this.$refs.container, { height: 0, transformOrigin: 'center center' })
      this.tl.to(this.$refs.container, 0.2, { height: thisHeight, transformOrigin: 'center center' })
      this.tl.to(this.$refs.container, 0.2, { height: '100%', transformOrigin: 'center center' })
    },
    animationAction () {
      this.tl.set(this.$refs.container, { filter: 'brightness(100%)', y: 0, transformOrigin: 'center center' })
      this.tl.to(this.$refs.container, 0.1, { filter: 'brightness(40%)', y: '75px', transformOrigin: 'center center' })
      this.tl.to(this.$refs.container, 0.1, { filter: 'brightness(100%)', y: 0, transformOrigin: 'center center' })
    }
  }
}
</script>

<style lang="scss">
  .cardContainer {
    &__container {
      padding-top: 20px;
      padding-right: 30px;
      padding-left: 30px;
      padding-bottom: 20px;
      background-color: #fff;
      border-radius: 20px;
    }

    &__scroll {
      overflow-y: auto;
    }

    &_theme {
      &_disabled {
        background-color: darken(#fff, 10%);
        //filter: blur(1px);
      }
    }
  }
</style>
