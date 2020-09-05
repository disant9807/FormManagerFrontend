<template>
  <div
    class="spinner-battlenet"
    :class="'spinner-battlenet--size' + size"
  >
    <div
      class="spinner"
      :class="['spinner--size' + size, 'spinner--' + color]"
    >
      <div class="spinner__circle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpinnerBattlenet',
  props: {
    size: {
      type: Number,
      default: 32
    },
    color: {
      default: 'bnet',
      type: String
    }
  }
}
</script>

<style lang="scss">
$animation-duration: 700ms;
$sizes: 8, 16, 24, 32, 48, 64, 128;

.spinner {
  position: absolute;
  transform-origin: top left;

  &::after {
    animation-name: rotation3;
  }

  &::before {
    animation-name: rotation2;
  }

  .spinner__circle {
    animation-name: rotation1;
  }

  .spinner__circle,
  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 32px;
    height: 32px;
    content: "";
    border-top-width: 4px;
    border-top-style: solid;
    border-top-color: #04afff;
    border-left-width: 2px;
    border-left-style: solid;
    border-left-color: #04afff;
    border-radius: 32px;
    animation-duration: $animation-duration;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    perspective: 600px;
  }
  // Themes
  &.spinner--white {
    .spinner__circle,
    &::before,
    &::after {
      border-top-color: #fff;
      border-left-color: #fff;
    }
  }

  &.spinner--bnet {
    .spinner__circle,
    &::before,
    &::after {
      border-top-color: #04afff;
      border-left-color: #04afff;
    }
  }

  &.spinner--wow {
    .spinner__circle,
    &::before,
    &::after {
      border-top-color: #ffb100;
      border-left-color: #ffb100;
    }
  }

  &.spinner--d3 {
    .spinner__circle,
    &::before,
    &::after {
      border-top-color: #cf590b;
      border-left-color: #cf590b;
    }
  }

  // Sizes
  @for $i from 1 through length($sizes) {
    &-battlenet--size#{nth($sizes, $i)} {
      width: nth($sizes, $i) + px;
      height: nth($sizes, $i) + px;
    }

    &.spinner--size#{nth($sizes, $i)} {
      transform: scale(nth($sizes, $i)/32);
    }
  }
}

@keyframes rotation1 {
  0% {
    transform: rotateX(65deg) rotateZ(45deg);
  }

  100% {
    transform: rotateX(65deg) rotateZ(405deg);
  }
}

@keyframes rotation2 {
  0% {
    transform: rotateX(-45deg) rotateY(45deg) rotateZ(180deg);
  }

  100% {
    transform: rotateX(-45deg) rotateY(45deg) rotateZ(540deg);
  }
}

@keyframes rotation3 {
  0% {
    transform: rotateX(45deg) rotateY(45deg) rotateZ(270deg);
  }

  100% {
    transform: rotateX(45deg) rotateY(45deg) rotateZ(630deg);
  }
}
</style>
