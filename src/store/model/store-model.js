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

  updateProduct: thunk(async (actions, { productId }) => {
    try {
      await baseURL.patch(`/admin/api/products/${productId}`);
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

export const categoryModel = {
  categories: [],

  setCategory: action((state, payload) => {
    state.categories = payload;
  }),
  fetchCategories: thunk(async (actions, payload) => {
    try {
      const { data } = await baseURL.get("/api/categories", payload);
      actions?.setCategory(data);
    } catch (e) {
      console.log("Error fetching categories:", e);
    }
  }),
};

export const userModel = {
  users: [],

  setUser: action((state, payload) => {
    state.users = payload;
  }),

  fetchUser: thunk(async (actions, payload) => {
    try {
      const { data } = await baseURL.get("/api/users", payload);
      actions.setUser(data);
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  }),

  deleteUser: thunk(async (actions, payload) => {
    try {
      await baseURL.delete(`/admin/api/users/${payload.userId}`);
      actions.fetchUser();
    } catch (error) {
      console.log(error);
    }
  }),
};

export const currentUserModel = {
  user: {},

  setUser: action((state, payload) => {
    state.user = payload;
  }),

  fetchCurrentUser: thunk(async (actions) => {
    try {
      const { data } = await baseURL.get("/api/current/user");
      actions.setUser(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }),
};
