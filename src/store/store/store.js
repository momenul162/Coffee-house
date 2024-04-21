import { createStore } from "easy-peasy";
import { categoryModel, productModel, userModel } from "../model/store-model";

const store = createStore({
  products: productModel,
  users: userModel,
  categories: categoryModel,
});

export default store;
