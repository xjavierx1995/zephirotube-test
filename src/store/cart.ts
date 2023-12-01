import { CartState, ProductInCart } from "../interfaces/CartState";
import { Product } from "../interfaces/ProductState";

// initial state
const state: CartState = {
  cartList: []
}

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return [];
  },

  cartTotalPrice: (state, getters) => {
    return 0;/* getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0) */
  },

  isProductInCart: (state: CartState) => (product: Product) => {
    return !!state.cartList.find(e => e.id === product.id);
  }
}

// actions
const actions = {

  addProductToCart ({ state, commit }, product) {
    commit('setCheckoutStatus', null)
  }
}

// mutations
const mutations = {
  addProductToCart (state: CartState,  product: ProductInCart ) {
    state.cartList.push(product)
  },

  incrementItemQuantity (state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },

  setCartItems (state, { items }) {
    state.items = items
  },

  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}