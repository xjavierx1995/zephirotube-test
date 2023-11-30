
export interface ProductState {
  productsList: Product[];
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
}

export interface Rating {
  rate: number
  count: number
}
