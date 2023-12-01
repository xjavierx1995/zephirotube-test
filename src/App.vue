<template>
  <Toast position="bottom-left"/>
  <ConfirmDialog/>

  <CustomToolBar/>

  <div class="content">
    <ProductList/>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import CustomToolBar from './components/CustomToolBar.vue';
import ProductList from './components/ProductsList.vue';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
const store = useStore();

onMounted(() => {
  store.dispatch('products/getProducts');
  store.dispatch('products/getCategories');
})
</script>

<style scoped>
.content {
  margin: 16px;
}
</style>
