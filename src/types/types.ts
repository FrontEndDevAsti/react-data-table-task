// User interfaces
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    birthDate: string;
    bloodGroup: string;
    eyeColor: string;
  }

// Product interfaces  
export interface Product {
    id: number;
    title: string;
    brand: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    sku: string;
    discountPercentage: number;
    weight: number,
    availabilityStatus: string;
    minimumOrderQuantity: number;
  }