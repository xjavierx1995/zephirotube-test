
<template>
  <div class="card">
    <Toolbar id="toolbar">
      <template #start>
        <SplitButton size="small" @click="resetCategory" :label="selectedCategory" :model="categories"></SplitButton>
      </template>

      <template #center>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText placeholder="Buscar producto" v-model="search" @input="searchProduct"/>
        </span>
      </template>

      <template #end>
        <Button icon="pi pi-shopping-cart" @click="showCart = true" />
        <Sidebar v-model:visible="showCart" header="Carrito de compras" class="w-full md:w-20rem lg:w-30rem" position="right">
          <CartList />
        </Sidebar>
      </template>
    </Toolbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, ref } from 'vue';
import { useStore } from 'vuex';
import Button from "primevue/button";
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import SplitButton from 'primevue/splitbutton';
import CartList from './CartList.vue';
import { Product } from '../interfaces/ProductState';
import Sidebar from 'primevue/sidebar';


const store = useStore();
const search = ref('');
const allProducts: ComputedRef<Product[]> = computed(() => store.state.products.allProducts);
const selectedCategory: ComputedRef<string> = computed(() =>
  store.state.products.selectedCategory ? store.state.products.selectedCategory : 'Categoría'
);
const categories: ComputedRef<any[]> = computed(() => store.state.products.categoriesList.map(cat => ({
  label: cat,
  command: () => store.dispatch('products/getProductsByCategory', cat)
})));

const showCart = ref(false);

const searchProduct = () => {
  const productsFiltered = allProducts.value.filter(e => e.title.toLowerCase().includes(search.value.toLowerCase()));
  store.commit('products/resetSelectedCategory');
  store.commit('products/setProducts', productsFiltered);
};

const resetCategory = () => {
  store.commit('products/resetSelectedCategory');
  store.commit('products/setProducts', allProducts.value);
};
</script>

<style scoped>
.card {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 9;
}

.p-toolbar {
  background: #264d73;
  border: none;
  padding: 1.25rem;
  border-radius: 0;
  gap: 0.5rem;
}
</style>
