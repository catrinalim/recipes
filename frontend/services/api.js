import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (userData) => api.post('/users', userData),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
};

export const recipeAPI = {
  getAll: (userId) => api.get('/recipes', { params: { user_id: userId } }),
  getById: (id) => api.get(`/recipes/${id}`),
  create: (recipeData) => api.post('/recipes', recipeData),
  update: (id, recipeData) => api.put(`/recipes/${id}`, recipeData),
  delete: (id) => api.delete(`/recipes/${id}`),
  getSuggestions: (userId) => api.post('/recipes/suggestions', { user_id: userId }),
};

export const inventoryAPI = {
  getAll: (userId) => api.get('/inventory', { params: { user_id: userId } }),
  add: (userId, ingredientName) => api.post('/inventory', { user_id: userId, ingredient_name: ingredientName }),
  update: (id, ingredientName) => api.put(`/inventory/${id}`, { ingredient_name: ingredientName }),
  delete: (id) => api.delete(`/inventory/${id}`),
};

export const ingredientAPI = {
  getByRecipe: (recipeId) => api.get(`/ingredients/recipe/${recipeId}`),
  add: (ingredientData) => api.post('/ingredients', ingredientData),
  update: (id, ingredientData) => api.put(`/ingredients/${id}`, ingredientData),
  delete: (id) => api.delete(`/ingredients/${id}`),
};

export default api;