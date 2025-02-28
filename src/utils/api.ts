import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

// Users API
export const fetchUsersAPI = async ({ limit = 5, skip = 0 }) => {
  const response = await axios.get(`${API_BASE_URL}/users?limit=${limit}&skip=${skip}`);
  return response.data;
};

// Products API
export const fetchProductsAPI = async ({ limit = 5, skip = 0, category = '' }) => {
  const url = category 
    ? `${API_BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
    : `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;
  
  const response = await axios.get(url);
  return response.data;
};