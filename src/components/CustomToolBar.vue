
<template>
  <div class="card">
    <Toolbar>
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
        <Button icon="pi pi-upload" />
      </template>
    </Toolbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef } from 'vue';
import { useStore } from 'vuex';
import Button from "primevue/button";
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import SplitButton from 'primevue/splitbutton';

const store = useStore();
const selectedCategory: ComputedRef<string> = computed(() => 
  store.state.products.selectedCategory ? store.state.products.selectedCategory : 'Categoría'
);
const categories: ComputedRef<any[]> = computed(() => store.state.products.categoriesList.map(cat => ({
  label: cat,
  command: () => {
    store.dispatch('products/getProductsByCategory', cat);
  }
})));

</script>
