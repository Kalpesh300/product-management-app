export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  inStock: boolean;
  ratingStar: number;
  isRemoved: boolean;
}

export interface ProductFormValue {
  title: string
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  inStock: string | boolean;
  ratingStar: number;
}