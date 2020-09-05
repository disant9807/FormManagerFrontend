<template>
  <ol class="inputTreeSearch">
    <input-tree-result-node
      v-for="(node, nodeIndex) in tree"
      :key="node.id"
      :item="node"
      :index="nodeIndex + 1"
      :sub="nodeIndex + 1"
      :depth="1"
      @onSelect="emitSelected"
    />
  </ol>
</template>

<script>
import inputTreeResultNode from '@/components/input/inputTree/inputTreeResultNode'

export default {
  name: 'InputTreeSearch',
  components: { inputTreeResultNode },
  props: {
    tree: {
      type: Array,
      required: true
    }
  },
  methods: {
    emitSelected (node) {
      this.$emit('onSelect', node)
    }
  }
}
</script>

<style lang="scss">
.inputTreeSearch {
  & span:hover {
    color: $gray;
    background-color: rgba(118, 131, 143, 0.1);
    border-color: #e4eaec;
    cursor: pointer;
  }

  &__folder {
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.1);
  }
}

/* ol { */

/*  counter-reset: item; */

/* } */

/* !*counter-reset: item;*! */

/* li { */

/*  display: block; */

/*  &:before { */

/*    content: counters(item, '.') ' '; */

/*    counter-increment: item; */

/*  } */

/* } */
</style>
