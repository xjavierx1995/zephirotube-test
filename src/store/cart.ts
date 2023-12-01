import { CartState, ProductInCart } from "../interfaces/CartState";

// initial state
const state: CartState = {
  cartList: []
}

// getters
const getters = {
  cartTotalPrice: (state) => {
    return state.cartList.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  },
}

// actions
const actions = {}

// mutations
const mutations = {
  addProductToCart (state: CartState,  product: ProductInCart ) {
    state.cartList.push(product)
  },

  incrementProductQuantity (state, id) {
    const cartItem = state.cartList.find(item => item.id === id)
    cartItem.quantity++
  },

  decrementProductQuantity (state, id) {
    const cartItem = state.cartList.find(item => item.id === id)
    cartItem.quantity--
  },

  deleteProductFromCart (state, id) {
    state.cartList = state.cartList.filter(item => item.id !== id);
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}