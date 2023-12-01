
<template>
  <div class="card">
    <Toolbar id="toolbar">
      <template #start>
        <SplitButton size="small" :label="selectedCategory" :model="categories"></SplitButton>
      </template>

      <template #center>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText placeholder="Search" />
        </span>
      </template>

      <template #end>
        <Button icon="pi pi-shopping-cart" @click="toggle" />
        <OverlayPanel ref="op" appendTo="#toolbar" showCloseIcon :dismissable="false" style="max-width: 41rem;">
          <CartList />
        </OverlayPanel>
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
import OverlayPanel from 'primevue/overlaypanel';
import CartList from './CartList.vue';

const store = useStore();
const op = ref();
const selectedCategory: ComputedRef<string> = computed(() =>
  store.state.products.selectedCategory ? store.state.products.selectedCategory : 'Categoría'
);
const categories: ComputedRef<any[]> = computed(() => store.state.products.categoriesList.map(cat => ({
  label: cat,
  command: () => store.dispatch('products/getProductsByCategory', cat)
})));

const toggle = (event) => {
  op.value.toggle(event);
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
