
export interface ProductState {
  productsList: Product[];
  allProducts: Product[];
  selectedProduct: Product | null;
  categoriesList: string[];
  selectedCategory: string;
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
  inCart: boolean
}

export interface Rating {
  rate: number
  count: number
}
