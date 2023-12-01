import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

createApp(App)
  .use(ConfirmationService)
  .use(ToastService)
  .use(store)
  .use(PrimeVue)
  .mount('#app');
