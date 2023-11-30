<template>
  
  <CustomToolBar />

  <div class="content">
    <ProductList/>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import CustomToolBar from './components/CustomToolBar.vue';
import ProductList from './components/ProductsList.vue';

const store = useStore();

async function hello() {
  await store.dispatch('products/getProducts');
  await store.dispatch('products/getCategories');
  // await store.dispatch('products/getProductsByCategory', 'electronics');
  const products = computed(() => store.state.products.productsList);
  console.log(products.value);
}
onMounted(() => {
  
  hello();
})
</script>

<style scoped>
.content {
  margin: 16px;
}
</style>
