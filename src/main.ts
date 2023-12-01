import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

createApp(App).use(ToastService).use(store).use(PrimeVue).mount('#app');
