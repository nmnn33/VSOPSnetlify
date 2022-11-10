<script setup>
  import HeaderBar from './components/HeaderBar.vue';
  import ordersPage from './views/ordersPage.vue'
  import dbQueryResultPageVue from './views/dbQueryResultPage.vue';
</script>

<template>
  <div class="container">
    <HeaderBar />
    <RouterView />
  </div>
</template>