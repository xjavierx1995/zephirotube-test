<script setup lang="ts">
import { computed, onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { useStore } from 'vuex';
import Button from "primevue/button";
const store = useStore();

async function hello() {
  await store.dispatch('products/getProducts');
  await store.dispatch('products/getCategories');
  await store.dispatch('products/getProductsByCategory', 'electronics');
  const products = computed(() => store.state.products.productsList);
  console.log(products.value);
}
onMounted(() => {
  
  hello();
})
</script>

<template>
  
  <Button icon="pi pi-check" label="Save" />

  <Button label="Submit"/>
  <Button label="Success" severity="success" />


  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>

</style>
