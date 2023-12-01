
<template>
  <div class="card">
    <DataView :value="products" :dataKey="'list'" style="max-height: 35rem; overflow: auto;" 
      :alwaysShowPaginator="false" >
      <template #empty>
        <div>
          No ha agregado productos al carrito
        </div>
      </template>
      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(product, index) in slotProps.items" :key="index" class="col-12">
            <div class="flex flex-row align-items-start p-2 gap-4"
              :class="{ 'border-top-1 surface-border': index !== 0 }">
              <img class="w-3 sm:w-2rem xl:w-4rem shadow-2 block xl:block mx-auto border-round" :src="product.image"
                :alt="product.title" />
              <div
                class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                  <div class="font-bold text-900 max-w-17rem">{{ product.title }}</div>
                  <Rating :modelValue="product.rating.rate" readonly :cancel="false"></Rating>
                  <div class="flex align-items-center gap-3">
                    <span class="flex align-items-center gap-2">
                      <i class="pi pi-tag"></i>
                      <span class="font-semibold">{{ product.category }}</span>
                    </span>
                  </div>
                </div>
                <div class="flex flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                  <span class="text-2xl font-semibold"> ${{ product.price }} x{{ product.quantity }}</span>
                  <span class="text-2xl font-semibold">{{ formatCurrency(product.price * product.quantity) }}</span>
                  <div class="flex gap-1">
                    <Button :disabled="product.quantity <= 1" icon="pi pi-minus" outlined size="small"
                      @click="store.commit('cart/decrementProductQuantity', product.id);"></Button>
                    <Button :disabled="product.quantity >= 50" icon="pi pi-plus" outlined size="small"
                      @click="store.commit('cart/incrementProductQuantity', product.id);"></Button>
                    <Button icon="pi pi-trash" outlined severity="danger" size="small"
                      @click="confirmDelete(product.id)"></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
    <div class="flex justify-content-between align-items-center pt-3" v-if="products.length > 0">
      <div class="font-bold text-900 max-w-17rem">Total: {{ formatCurrency(total) }}</div>
      <Button @click="confirmPurchase()" icon="pi pi-shopping-bag"  class="w-auto" label="Realizar compra"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef, computed } from "vue";
import { ProductInCart } from "../interfaces/CartState";
import { useStore } from 'vuex';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import DataView from 'primevue/dataview';
import Rating from 'primevue/rating';
import Button from "primevue/button";
const confirm = useConfirm();
const store = useStore();
const toast = useToast();

const products: ComputedRef<ProductInCart[]> = computed(() => store.state.cart.cartList);
const total = computed(() => store.getters['cart/cartTotalPrice']);

const confirmDelete = (productId) => {
  confirm.require({
    message: '¿Quieres eliminar este producto del carrito de compras?',
    header: 'Confirme la acción',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-text p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    acceptLabel: 'Sí',
    accept: () => {
      store.commit('cart/deleteProductFromCart', productId);
      toast.add({ severity: 'info', summary: '', detail: 'Se ha eliminado el producto del carrito de compras', life: 3000 });
    },
  });
};

const confirmPurchase = () => {
  confirm.require({
    message: `El total de la compra es ${formatCurrency(total.value)}`,
    header: '¿Desea continuar con el proceso?',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-danger p-button-text',
    acceptClass: 'p-button-text p-button-text',
    acceptLabel: '¡Comprar!',
    accept: () => {
      store.commit('cart/restartCartStore');
      toast.add({ severity: 'success', summary: '', detail: '¡Se ha realizado la compra satisfactoriamente!', life: 3000 });
    },
  });
};

const formatCurrency = (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
</script>
