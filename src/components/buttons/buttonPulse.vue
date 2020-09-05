<template lang="pug">
  .btn.btn--fixed.p-0
    .btn.btn-danger.btn--round.btn--xlarge
      font-awesome-icon(icon="trash-alt" size="3x")
    .pulse.circle
      .pulse
</template>

<script>
import TweenMax from 'gsap/TweenMax'

export default {
  name: 'ButtonPulse',
  mounted () {
    TweenMax.from('circle', 0.4, {
      scale: 0,
      transformOrigin: 'center center',
      /* eslint-disable */
      ease: Power1.easeInOut,
      /* eslint-enable */
      onComplete () {
        TweenMax.to('.pulse', 1, {
          scale: 1.4,
          transformOrigin: 'center center',
          opacity: 0,
          repeat: -1,
          delay: 0.5
        })
      }
    })
  }
}
</script>
