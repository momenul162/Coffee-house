import { action, thunk } from "easy-peasy";
import axios from "axios";

export const categoryModel = {
  categories: null,
  error: null,

  setError: action((state, payload) => {
    state.error = payload;
  }),

  setCategory: action((state, payload) => {
    state.categories = payload;
  }),
  fetchCategories: thunk(async (actions) => {
    try {
      const res = await axios.get("http://localhost:4000/api/categories");

      actions?.setCategory(res.data);
      actions?.setError(null);
    } catch (e) {
      actions.setError(e.response?.data?.message);
    }
  }),
};
