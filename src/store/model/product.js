import { action, thunk } from "easy-peasy";
import { baseURL } from "../../utils/baseURL";

export const productModel = {
  products: [],

  setProducts: action((state, payload) => {
    state.products = payload;
  }),

  fetchProducts: thunk(async (actions, { page, limit }) => {
    try {
      const { data } = await baseURL(`/api/products?page=${page}&limit=${limit}`);
      actions?.setProducts(data);
    } catch (e) {
      console.log("Error fetching products:", e);
    }
  }),

  updateProduct: thunk(async (actions, { productId, data, page, limit }) => {
    console.log("[productId] ", productId, "[data] ", data);
    try {
      await baseURL.patch(`/admin/api/products/${productId}`, data);
      actions.fetchProducts({ page, limit });
    } catch (error) {
      console.log(error);
    }
  }),

  deleteProduct: thunk(async (actions, { productId, page, limit }) => {
    try {
      await baseURL.delete(`/admin/api/products/${productId}`);
      actions.fetchProducts({ page, limit });
    } catch (error) {
      console.log(error);
    }
  }),
};

export const searchProductById = {
  product: {},

  setProduct: action((state, payload) => {
    state.product = payload;
  }),
  fetchProduct: thunk(async (actions, { productId }) => {
    try {
      const { data } = await baseURL(`/api/products/${productId}`);
      actions.setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }),
};
