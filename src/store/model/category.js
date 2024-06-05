import { action, thunk } from "easy-peasy";
import { baseURL } from "../../utils/baseURL";

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
