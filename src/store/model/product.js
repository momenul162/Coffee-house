import { action, thunk } from "easy-peasy";
import { baseURL } from "../../utils/baseURL";
import axios from "axios";

export const productModel = {
  products: [],
  error: null,

  setError: action((state, payload) => {
    state.error = payload;
  }),

  setProducts: action((state, payload) => {
    state.products = payload;
  }),

  fetchProducts: thunk(async (actions, { page, limit }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/products?page=${page}&limit=${limit}`
      );
      actions?.setProducts(data);
      actions.setError(null);
    } catch (e) {
      actions.setError(e.response?.data?.message);
    }
  }),

  updateProduct: thunk(async (actions, { productId, data, page, limit }) => {
    try {
      await baseURL.patch(`/admin/api/products/${productId}`, data);
      actions.fetchProducts({ page, limit });
      actions.setError(null);
    } catch (error) {
      actions.setError(error.response?.data?.message);
    }
  }),

  deleteProduct: thunk(async (actions, { productId, page, limit }) => {
    try {
      await baseURL.delete(`/admin/api/products/${productId}`);
      actions.fetchProducts({ page, limit });
      actions.setError(null);
    } catch (error) {
      actions.setError(error.response?.data?.message);
    }
  }),
};

export const searchProductById = {
  product: {},
  error: null,

  setError: action((state, payload) => {
    state.error = payload;
  }),

  setProduct: action((state, payload) => {
    state.product = payload;
  }),
  fetchProduct: thunk(async (actions, { productId }) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/products/${productId}`);
      actions.setProduct(data);
      actions.setError(null);
    } catch (error) {
      actions.setError(error.response?.data?.message);
    }
  }),
};
