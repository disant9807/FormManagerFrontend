template>
  <b-img-lazy
    :src="src"
    :alt="alt"
    blank-color="#eee"
    fluid-grow
    :width="width"
    :height="height"
  />
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'

export default {
  name: 'AppImgLazy',
  components: {
    BImgLazy
  },
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  }
}
</script>
