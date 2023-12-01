
<template>
  <div class="card">
    <div class="flex justify-content-end mb-2" v-if="!isMobile">
      <SelectButton v-model="displayOptions" :options="options" optionLabel="value" dataKey="value" aria-labelledby="basic">
        <template #option="slotProps">
          <i :class="slotProps.option.icon"></i>
        </template>
      </SelectButton>
    </div>
    <DataTable v-if="displayOptions.value === 'list' && !isMobile" :value="products" tableStyle="min-width: 50rem" stripedRows paginator
      :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" scrollable scrollHeight="flex">
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
          <Button icon="pi pi-cart-plus" v-if="!isInCart(slotProps.data.id)" rounded class="mr-2" size="small"
            @click="addCart(slotProps.data)" />
        </template>
      </Column>
      <template #footer> {{ products ? products.length : 0 }} productos. </template>
    </DataTable>

    <DataView v-else :value="products" :layout="'grid'" :dataKey="'grid'" :alwaysShowPaginator="false">
      <template #empty>
        <div>
          No hay productos
        </div>
      </template>
      <template #grid="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(product, index) in slotProps.items" :key="index" class="col-12 sm:col-6 lg:col-3 xl:col-3 p-2 ">
            <div
              class="p-4 border-1 surface-border surface-card border-round h-full flex justify-content-between flex-column">
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <div class="flex align-items-center gap-2">
                  <i class="pi pi-tag"></i>
                  <span class="font-semibold">{{ product.category }}</span>
                </div>
              </div>
              <div class="flex flex-column align-items-center gap-3 py-5">
                <img class="shadow-2 border-round" style="width: 65px; max-width: 65px; min-width: 65px;"
                  :src="product.image" :alt="product.title" />
                <div class="font-bold">{{ product.title }}</div>
                <Rating :modelValue="product.rating.rate" readonly :cancel="false"></Rating>
              </div>
              <div class="flex align-items-center justify-content-between">
                <span class="text-2xl font-semibold">${{ product.price }}</span>
                <Button icon="pi pi-shopping-cart" v-if="!isInCart(product.id)" rounded
                  @click="addCart(product)"></Button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>

  <ModalProduct :show-modal="showProductDetail" @close-modal="showProductDetail = false" />
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
import DataView from 'primevue/dataview';
import SelectButton from 'primevue/selectbutton';


import { ProductInCart } from '../interfaces/CartState';

const store = useStore();
const products: ComputedRef<Product[]> = computed(() => store.state.products.productsList);
const isMobile = ref(false);
const productsInCart: ComputedRef<ProductInCart[]> = computed(() => store.state.cart.cartList);
const options = ref([
  { icon: 'pi pi-microsoft', value: 'grid' },
  { icon: 'pi pi-bars', value: 'list' },
]);
const displayOptions = ref(options.value[1]);
const showProductDetail = ref(false);

function addCart(product: Product) {
  store.commit('products/setSelectedProduct', product);
  showProductDetail.value = true;
}

const isInCart = (productId: number) => {
  return !!productsInCart.value.find(e => e.id === productId);
}

const screenSize = () => isMobile.value = window.innerWidth < 768;
window.addEventListener('resize', screenSize);
</script>

<style scoped>
.card {
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
</style>