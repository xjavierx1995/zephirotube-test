
<template>
  <div class="card">
    <DataTable :value="products" tableStyle="min-width: 50rem" 
      stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"  scrollable scrollHeight="flex">
      <Column field="title" header="Nombre" style="max-width:25rem"></Column>
      <Column header="Imagen">
        <template #body="slotProps">
          <img :src="slotProps.data.image" :alt="slotProps.data.title" class="w-4rem shadow-2 border-round" />
        </template>
      </Column>
      <Column field="category" header="Categoría"></Column>
      <Column header="Precio">
        <template #body="slotProps">
          {{ slotProps.data.price }}$
        </template>
      </Column>
      <Column header="Reviews">
        <template #body="slotProps">
          <Rating :modelValue="slotProps.data.rating.rate" readonly :cancel="false" />
        </template>
      </Column>
      <Column style="max-width:5rem">
        <template #body="slotProps">
          <Button icon="pi pi-cart-plus" rounded class="mr-2" size="small" @click="addCart(slotProps.data)"/>
        </template>
      </Column>
      <template #footer> {{ products ? products.length : 0 }} productos. </template>
    </DataTable>
  </div>

  <ModalProduct :show-modal="showProductDetail" @close-modal="showProductDetail = false"/>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useStore } from 'vuex';
//components
import { Product } from '../interfaces/ProductState';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Rating from 'primevue/rating';
import Button from 'primevue/button';
import ModalProduct from '../components/ModalProduct.vue';

const store = useStore();
const products: ComputedRef<Product[]> = computed(() => store.state.products.productsList);
const showProductDetail = ref(false);

function addCart(product: Product) {
  store.commit('products/setSelectedProduct', product);
  showProductDetail.value = true;
}
</script>

<style scoped>
.card {
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
</style>