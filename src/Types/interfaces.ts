import { Timestamp } from "firebase/firestore/lite";

export interface ValuationFormValues {
  productType?: string;
  productName?: string;
  taste?: number;
  spices?: number;
  cookingExperience?: number;
  receipeChoice?: string;
  packaging?: number;
  message?: string;
  total?: number;
  createdAt: Timestamp;
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  createdAt: Date;
}

export interface CartItem extends Product {
  id: string;
  quantity: number;
  totalPrice: number;
  tax: number;
  delivary: number;
}
