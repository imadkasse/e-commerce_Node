export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string;
  category: string;
  quantity: number;
  rating: number;
  newPrice?: number;
  availability: boolean;
}
