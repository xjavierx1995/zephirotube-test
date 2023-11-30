
<template>
  <div class="card">
    <Toolbar>
      <template #start>
        <Button icon="pi pi-plus" class="mr-2" />
        <Button icon="pi pi-print" class="mr-2" />
        <Button icon="pi pi-upload" />
      </template>

      <template #center>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText placeholder="Search" />
        </span>
      </template>

      <template #end>
        <SplitButton label="Save" icon="pi pi-check" :model="items"></SplitButton>
      </template>
    </Toolbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Button from "primevue/button";
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import SplitButton from 'primevue/splitbutton';


const items = ref([
  {
    label: 'Update',
    icon: 'pi pi-refresh'
  },
  {
    label: 'Delete',
    icon: 'pi pi-times'
  }
])
</script>
