<script setup lang="ts">
import { computed, onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { useStore } from 'vuex';
import Button from "primevue/button";
const store = useStore()

async function hello() {
  const products = computed(() => store.state.products.all);
  console.log(products.value);
}
onMounted(() => {
  store.dispatch('products/getAllProducts')
  hello();
})
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <Button icon="pi pi-check" label="Save" />

  <Button label="Submit"/>
  <Button label="Success" severity="success" />


  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>

</style>
