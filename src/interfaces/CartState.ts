import { Product } from "./ProductState";

export interface CartState {
  cartList: ProductInCart[];
}

export interface ProductInCart extends Product {
  quantity: number;
}