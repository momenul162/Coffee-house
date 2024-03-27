import { action, thunk } from "easy-peasy";
import axios from "axios";

export const productModel = {
  products: [],

  addProduct: action((state, payload) => {
    state.products = payload;
  }),

  fetchProducts: thunk(async (actions, payload) => {
    try {
      const { data } = await axios.get(payload.url);
      actions.addProduct(data);
    } catch (e) {
      console.log("Error fetching products:", e);
    }
  }),
};

export const userModel = {
  users: [],

  addUser: action((state, payload) => {
    state.users = payload;
  }),

  fetchUser: thunk(async (actions, payload) => {
    try {
      const { data } = await axios.get(payload.url);
      actions.addUser(data);
    } catch (error) {
      console.log("Error fatching users: ", error);
    }
  }),
};
