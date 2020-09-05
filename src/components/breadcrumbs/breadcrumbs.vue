template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        class="breadcrumb-item"
        :class="{ 'active': $route.path === $route.matched[0].path }"
      >
        <router-link :to="$route.matched[0].path">
          <font-awesome-icon icon="home-lg-alt" />
          {{ homeTitle }}
        </router-link>
      </li>

      <template v-for="(route, routeIndex) in $route.matched">
        <breadcrumbs-item
          :key="routeIndex"
          :route="route"
          :arr-length="$route.matched.length"
          :idx="routeIndex"
        />
      </template>
    </ol>
  </nav>
</template>

<script>
import breadcrumbsItem from '@/components/breadcrumbs/breadcrumbsItem'

export default {
  name: 'Breadcrumbs',
  components: {
    breadcrumbsItem
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    homeTitle () {
      return this.$route.matched.length &&
      this.$route.matched[0].hasOwnProperty('meta') &&
      this.$route.matched[0].meta.hasOwnProperty('bcTitle') &&
      this.$route.matched[0].meta.bcTitle
        ? this.$route.matched[0].meta.bcTitle
        : ''
    }
  }
}
</script>

<style lang="scss">
  .breadcrumb {
    margin: 0;
    padding: 1rem 0;
    font-size: 1rem;
    background-color: inherit;

    &-item {
      &.active {
        a {
          text-decoration: none;
          color: inherit;
          cursor: auto;
        }
      }
    }
  }
</style>
