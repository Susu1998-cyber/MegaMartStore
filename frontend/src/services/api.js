import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProducts = async (params = {}) => {
  const response = await api.get("/products", {
    params,
  });

  return response.data;
};

export const getProduct = async (slug) => {
  const response = await api.get(`/products/${slug}`);

  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const getCart = async () => {
  const response = await api.get("/cart");

  return response.data;
};

export const addCartItem = async (data) => {
  const response = await api.post("/cart/items", data);

  return response.data;
};

export const updateCartItem = async (id, quantity) => {
  const response = await api.patch(`/cart/items/${id}`, {
    quantity,
  });

  return response.data;
};

export const deleteCartItem = async (id) => {
  const response = await api.delete(`/cart/items/${id}`);

  return response.data;
};

export const createOrder = async () => {
  const response = await api.post("/orders");

  return response.data;
};

export default api;
