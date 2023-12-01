import { Product, ProductState } from "../interfaces/ProductState"
import $axios from "../plugins/axios"

// initial state
const state: ProductState = {
  allProducts: [],
  productsList: [],
  categoriesList: [],
  selectedCategory: '',
  selectedProduct: null
}

// getters
const getters = {}

// actions
const actions = {
  getProducts({ commit }) {
    $axios.get<Product[]>('/products').then(({ data }) => {
      commit('setProducts', data);
      commit('setAllProducts', data);
    });
  },
  getProductsByCategory({ commit }, category) {
    $axios.get<Product[]>(`/products/category/${category}`).then(({ data }) => {
      commit('setProducts', data);
      commit('setSelectedCategory', category);
    });
  },
  getCategories({ commit }) {
    $axios.get<string[]>('/products/categories').then(({ data }) => {
      commit('setCategories', data);
    });
  }
}

// mutations
const mutations = {
  setProducts(state: ProductState, products: Product[]) {
    state.productsList = products;
  },

  setAllProducts(state: ProductState, products: Product[]) {
    state.allProducts = products;
  },

  setCategories(state: ProductState, categories: string[]) {
    state.categoriesList = categories;
  },

  setSelectedCategory(state: ProductState, category: string) {
    state.selectedCategory = category;
  },

  setSelectedProduct(state: ProductState, product: Product) {
    state.selectedProduct = product;
  },

  deleteSelectedProduct(state: ProductState) {
    state.selectedProduct = null;
  },

  resetSelectedCategory(state: ProductState) {
    state.selectedCategory = '';
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}