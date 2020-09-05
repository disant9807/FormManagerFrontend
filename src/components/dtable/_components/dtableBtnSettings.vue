<template>
  <div
    v-on-clickaway="closeSettings"
    class="filter__btn"
  >
    <div
      class="btn btn--icon btn-primary"
      @click="toggleSettings"
    >
      <font-awesome-icon icon="cog" />
    </div>
    <div
      v-if="isOpen"
      class="filterblock"
      :class="'filterblock--' + position"
    >
      <div class="radio">
        <select
          :value="perPage"
          class="form-control"
          @input="onChangePerPage($event.target.value)"
        >
          <option
            v-for="option in perPageArr"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>

      <ul class="list-group">
        <li
          v-for="(field, fieldIndex) in visibleFields"
          :key="fieldIndex"
          class="flex align-items-center list-group-item-action px-1 py-2 cursor-pointer"
          @click="toggleVisible(field, fieldIndex)"
        >
          <font-awesome-icon
            :icon="field.visible ? ['far', 'check'] : 'times'"
            class="mr-2"
            fixed-width
          />
          {{ field.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    perPage: {
      type: [Number, String],
      default: 10
    },
    visibleFields: {
      type: Array,
      required: true
    },
    position: {
      type: String,
      default: 'bottom-left'
    }
  },
  data () {
    return {
      isOpen: false,
      perPageArr: [ 10, 25, 50 ]
    }
  },
  methods: {
    toggleSettings () {
      this.isOpen = !this.isOpen
    },
    closeSettings () {
      if (!this.isOpen) return

      this.isOpen = false
    },
    onChangePerPage (num) {
      this.$emit('onChangePerPage', num)
      this.closeSettings()
    },
    toggleVisible (field, fieldIndex) {
      this.$emit('onToggleVisible', field, fieldIndex)
    }
  }
}
</script>

<style lang="scss">
  .filterblock {
    position: absolute;
    z-index: 100;
    padding: 10px;
    min-width: max-content;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;

    & > div {
      margin-bottom: 5px;
    }

    & > div:last-child {
      margin-bottom: 0;
    }

    &--btn {
      width: 100%;

      button {
        width: 100%;
      }
    }

    &--bottom-left {
      top: 37px;
      right: 0;
    }

    &--right {
      top: auto;
      right: auto;
      bottom: 0;
      left: 39px;
    }
  }
</style>
