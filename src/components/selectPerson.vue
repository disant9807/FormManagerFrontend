<template>
  <div
    :id="'place-' + targetId"
    v-on-clickaway="closePopover"
    class="basesTabHousePlace__popover flex-grow-1"
  >
    <div
      class="d-flex align-items-center cursor-pointer"
      @click="togglePopover"
    >
      <div class="basesTabHousePlace__avatar mr-1">
        <div
          v-if="selected.avatar"
          :style="`background-image: url(${ selected.avatar })`"
        />
        <font-awesome-icon
          v-else
          icon="user-circle"
          size="2x"
          fixed-width
        />
      </div>
      <div
        v-if="selected.fio"
        class="d-flex flex-column align-items-start"
      >
        <small
          v-if="selected.staff_id"
          class="basesTabHousePlace--lineHeight"
        >[{{ selected.staff_id }}]
        </small>
        <div class="mr-1">
          {{ selected.fio | shortUsername }}
        </div>
      </div>
      <div v-else>
        Свободно
      </div>
    </div>
    <!--    <bases-tab-place-person-popover-->
    <!--      v-if="isOpen"-->
    <!--      :target-name="'place-' + targetId"-->
    <!--      :container="'place-' + targetId"-->
    <!--      :selected="selected"-->
    <!--      @onChange="handleChangePerson"-->
    <!--    />-->
  </div>
</template>

<script>
export default {
  name: 'SelectPerson'
}
</script>

<style scoped>

</style>
