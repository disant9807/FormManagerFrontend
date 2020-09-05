<template>
  <div
    id="cardModal"
    ref="cardModal"
    class="cardContent"
  >
    <div
      v-show="isOpen"
      ref="card"
      class="cardContent__main"
      :class="scrollable ? 'cardContent--scrollable' : 'cardContent__section'"
    >
      <!--Spinner-->
      <div
        v-if="isLoading"
        class="cardContent__spinner flex justify-content-center"
      >
        <!--Идет загрузка данных... -->
        <spinner-battlenet :size="64" />
      </div>
      <!--Карточка-->
      <div
        class="cardContent__close"
        @click="$emit('close')"
      />
      <transition
        name="zoomIn"
        appear
      >
        <div
          v-if="!isLoading"
          class="cardContent__wrap shadow"
          :style="'max-width:' + width + ';' + 'height:' + height + ';'"
          :class="[
            { 'p-0': !noHeader },
            { 'large': large && !(width || height) },
            { 'medium': medium && !(width || height) },
            { 'small': small && !(width || height) },
            { 'w-100': width }
          ]"
        >
          <div
            v-if="closeButton"
            title="Закрыть"
            class="cardContent__closeBtnContainer"
            @click="$emit('close')"
          >
            <div class="cardContent__closeBtn flex align-items-center justify-content-center">
              <font-awesome-icon
                icon="times"
                size="2x"
                class="text-white"
              />
            </div>
          </div>
          <div class="cardContent__mainCard">
            <div
              v-if="!noHeader"
              class="cardContent__header"
            >
              <slot name="head" />
            </div>
            <div class="cardContent__body">
              <slot />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="cardContent__back" />
  </div>
</template>

<script>
// import { TimelineLite } from 'gsap/TweenMax'
import spinnerBattlenet from '@/components/spinner/spinner-battlenet'

export default {
  name: 'Card',
  components: {
    spinnerBattlenet
  },
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    closeButton: {
      type: Boolean,
      default: true
    },
    isLoading: {
      /*
      * Spinner загрузки карточки. Если true, показываем спиннер, иначе показываем карточку
      * Используется, если карточка используется в router.
      * */
      type: Boolean,
      default: false
    },
    noHeader: {
      /*
      * Скрывает Header карточки
      * */
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    medium: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    scrollable: {
      /*
      * Если false, модальное окно распологается по центру экрана
      * Если true, модальное окно распологается сверху и скроллится при большом контенте
      * */
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tl: undefined,
      elements: undefined,
      header: undefined,
      footer: undefined,
      isOpen: false
    }
  },
  mounted () {
    // this.tl = new TimelineLite()
    this.animationMounted()
    // setTimeout(() => { // setTimeout to put this into event queue
    // }, 0)

    // запрещаем скролить страницу
    document.body.style.overflow = 'hidden'
    document.body.appendChild(this.$refs.cardModal)

    this.elements = document.getElementById('app').firstChild // кешируем элементы для blur
    this.elements.classList.add('cardContent__fon')
  },
  destroyed () {
    /*
    * Егор, от 13.02.2020
    * TODO: возможно стоит изменить, так как ID может быть только 1 на странице.
    * Нужно иметь в виду, когда потребуется выводить несколько карточек таких одновременно
    * */
    const findCard = document.body.querySelector('#cardModal')

    document.body.style.removeProperty('overflow')
    this.elements.classList.remove('cardContent__fon')

    /* из-за appendChild в mounted $refs перестает ссылкаться на элемент. В результате
    Приходится искать модалку по id */
    if (findCard) findCard.remove()
  },
  methods: {
    animationMounted () {
      this.isOpen = true
    }
  }
}
</script>

<style lang="scss">
.cardContent {
  position: absolute;
  z-index: 100;

  &__avatar {
    background-color: #0a2e38;
    border-radius: 20px;

    &_size-base {
      width: 50px;
      height: 50px;
    }

    &_size-mini {
      width: 30px;
      height: 30px;
    }
  }

  &__back {
    position: fixed;
    z-index: 98;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.5;
    background: linear-gradient(to top, lighten(#8f8f8f, 10%), darken(#282828, 10%));
  }

  &__badge {
    padding-right: 10px;
    padding-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 40px;

    &_green {
      background-color: $green;
    }

    &_blue {
      background-color: darken($blue, 2%);
    }

    &_red {
      background-color: $red;
    }
  }

  &__block {
    padding: 0 20px;
  }

  &__body {
    position: relative;
  }

  &__button {
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;

    &_theme-success {
      color: #fff;
      background: linear-gradient(45deg, lighten($green, 10%), darken($green, 5%));
      background-color: darken($green, 5%);

      &:hover {
        background: darken($green, 7%);
      }
    }

    &_theme-danger {
      color: #fff;
      background: linear-gradient(45deg, lighten($red, 10%), darken($red, 5%));
      background-color: darken($red, 5%);

      &:hover {
        background: darken($red, 7%);
      }
    }

    &_theme-default {
      background: linear-gradient(45deg, lighten(#fff, 10%), darken(#fff, 5%));
      background-color: #fff;
      border: 1px solid $light-gray;

      &:hover {
        background: darken(#fff, 7%);
      }
    }
  }

  &__closeBtnContainer {
    position: absolute;
    top: 8px;
    left: -64px;
    padding: 12px;
    width: 64px;
    height: 64px;
    opacity: 0.8;
    cursor: pointer;

    svg {
      transition: all 200ms;
    }

    &:hover {
      opacity: 1;

      svg {
        transform: rotate(90deg);
      }
    }
  }

  &__closeBtn {
    padding: 3px;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;

    &:hover {
      color: darken(#fff, 20%);
    }
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__content {
    display: flex;
  }

  &__container {
    padding-top: 20px;
    padding-right: 30px;
    padding-left: 30px;
    padding-bottom: 20px;
    background-color: #fff;
    border-radius: 20px;
  }

  &__fon {
    display: flex;
    width: 100%;
    flex-direction: column;
    transition: 0.2s;
    filter: blur(5px);
  }

  &__headNavButtons {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  &__headButton {
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;

    /* border: 1px solid; */
    svg {
      width: 20px;
      height: 20px;
      font-size: 1.5rem;
    }
  }

  &__hidden {
    overflow-y: scroll;
  }

  &__icon {
    display: flex;
    width: 45px;
    height: 45px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: $gray;
    border-radius: 50%;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background-color: $light-gray;
      transition: 0.1s;
    }
  }

  &__input {
    padding: 20px;
    border-radius: 3px;
  }

  &__input-auto {
    border: 1px solid $light-gray;
  }

  &__mainGluh {
    height: 2vh;
  }

  &__main {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &--scrollable {
    overflow-y: auto;
  }

  &__mainCard {
    padding-top: 20px;
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 20px;
    height: 100%;
    transition: 0.2s;

    &_auto {
      overflow-y: auto;
    }
  }

  &__section {
    margin: 0 auto;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  &__smallContainer {
    padding: 10px 20px;
    background-color: white;
    border-radius: 40px;
  }

  &__spinner {
    font-size: 1.2rem;
    color: white;
  }

  &__strokeContainer {
    padding: 5px 30px;
    background-color: white;
    border-radius: 100px;
  }

  &__wrap {
    position: relative;
    margin: 1.5rem auto;
    width: 60%;
    background-color: #f8f8f8;
    border-radius: 10px;

    &.small {
      width: 30%;
      height: auto;
    }

    &.medium {
      width: 60%;
      height: auto;
    }

    &.large {
      width: 85%;
      height: auto;
    }
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0, 0, 0);
  }

  50% {
    opacity: 1;
    transform: scale3d(1.05, 1.05, 1);
  }
}

.zoomIn-enter-active {
  animation: zoomIn 0.5s;
}
</style>
