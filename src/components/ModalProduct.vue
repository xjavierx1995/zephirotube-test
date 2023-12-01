<template>
  <Dialog :visible="showModal" :style="{ width: '450px' }" header="Detalles del producto" :modal="true" class="p-fluid">
    <template #closeicon>
      <Button icon="pi pi-times" severity="secondary" text rounded @click="close" />
    </template>
    <img v-if="product.image" :src="product.image" :alt="product.title" class="max-w-10rem block m-auto pb-3" />
    <div class="field flex flex-column align-items-center mt-2">
      <Rating :modelValue="product.rating.rate" readonly :cancel="false" />
    </div>
    <div class="field">
      <label for="name">Nombre</label>
      <InputText readonly id="name" v-model.trim="product.title" required="true" />
    </div>
    <div class="field">
      <label for="description">Descripción</label>
      <Textarea autoResize readonly id="description" v-model="product.description" rows="3" cols="20" />
    </div>

    <div class="field">
      <label for="category">Categoría</label>
      <InputText readonly id="category" v-model="product.category" rows="3" cols="20" />
    </div>

    <div class="formgrid grid">
      <div class="field col">
        <label for="price">Precio</label>
        <InputNumber readonly id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
      </div>
    </div>
    <div class="field flex flex-column align-items-center">
      <div class="w-full">
        Cantidad
      </div>
      <Knob v-model="quantity" :size="150"  :max="50"/>
      <div class="flex gap-2">
        <Button icon="pi pi-minus" @click="quantity--" :disabled="quantity <= 1" />
        <Button icon="pi pi-plus" @click="quantity++" :disabled="quantity >= 50" />
      </div>
    </div>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" text @click="close" />
      <Button label="Añadir al carrito" icon="pi pi-check" text @click="saveProduct" />
    </template>
    
  </Dialog>
</template>

<script setup lang="ts">
import { ComputedRef, computed, ref } from 'vue';
import { Product } from '../interfaces/ProductState';
import { useStore } from 'vuex';

//components
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Knob from 'primevue/knob';
import Rating from 'primevue/rating';
import { useToast } from "primevue/usetoast";

defineProps<{ showModal: boolean }>();

const emit = defineEmits(['closeModal']);
const store = useStore();
const quantity = ref(1);
const product: ComputedRef<Product> = computed(() => store.state.products.selectedProduct);
const toast = useToast();

const saveProduct = () => {
  store.commit('cart/addProductToCart', { ...product.value, quantity: quantity.value });
  store.commit('products/deleteSelectedProduct');
  toast.add({ severity: 'info', summary: '', detail: 'Producto agregado al carrito', life: 3000,  });
  emit('closeModal');
};

const close = () => {
  store.commit('products/deleteSelectedProduct');
  emit('closeModal');
};

</script>
