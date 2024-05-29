import { createStore } from "easy-peasy";
import { categoryModel, currentUserModel, productModel, userModel } from "../model/store-model";

const store = createStore({
  products: productModel,
  users: userModel,
  currentUser: currentUserModel,
  categories: categoryModel,
});

export default store;
