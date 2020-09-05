<template>
  <header>
    <nav class="navbar sticky">
      <h4 class="text-white m-0 ml-3">Тестирование форм</h4>
    </nav>
    <!--Выдвижное меню-->
  </header>
</template>

<script>

export default {
  name: 'Vheader'
}
</script>

<style lang="scss">
header .navbar {
  padding: 0;
  height: 60px;
  background: #374d5a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

  &.sticky {
    position: fixed;
    z-index: 50;
    top: 0;
    width: 100%;
    flex-wrap: nowrap;
  }

  &.sticky + .page__content {
    padding-top: 100px;
  }
}
</style>
