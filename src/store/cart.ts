import { CartState } from "../interfaces/CartState";
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
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit('pushProductToCart', { id: product.id })
      } else {
        commit('incrementItemQuantity', cartItem)
      }
      // remove 1 item from stock
      commit('products/decrementProductInventory', { id: product.id }, { root: true })
    }
  }
}

// mutations
const mutations = {
  pushProductToCart (state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
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