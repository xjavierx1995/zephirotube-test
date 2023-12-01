import { createStore } from 'vuex';
import cart from './cart';
import products from './products';

export default createStore({
  modules: {
    cart,
    products
  },
})