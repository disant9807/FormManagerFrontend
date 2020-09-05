<template>
  <li
    class="tree-menu"
    @click.stop="handleSelect(item)"
  >
    <span
      class="multiselect__option"
      :style="indent"
      :class="{ 'inputTreeSearch__folder': isFolder }"
    >{{ item.number }} {{ item.name }}</span>
    <ol v-if="isFolder">
      <input-tree-result-node
        v-for="(node, nodeIndex) in item.children"
        :key="nodeIndex"
        :item="node"
        :index="nodeIndex + 1"
        :sub="`${sub}.${nodeIndex + 1}`"
        :depth="depth + 1"
        @onSelect="handleSelect"
      />
    </ol>
  </li>
</template>

<script>
export default {
  name: 'InputTreeResultNode',
  props: ['depth', 'index', 'sub', 'item'],
  computed: {
    indent () {
      return { paddingLeft: `${this.depth * 10}px` }
      // return { transform: `translate(${this.depth * 10}px)` }
    },
    isFolder () {
      return this.item.children && this.item.children.length
    }
  },
  methods: {
    handleSelect (item) {
      this.$emit('onSelect', item)
    }
  }
}
</script>
