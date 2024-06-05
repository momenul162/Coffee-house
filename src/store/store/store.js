import { createStore } from "easy-peasy";
import { productModel, searchProductById } from "../model/product";
import { currentUserModel, userModel } from "../model/user";
import { categoryModel } from "../model/category";

const store = createStore({
  products: productModel,
  product: searchProductById,
  users: userModel,
  currentUser: currentUserModel,
  categories: categoryModel,
});

export default store;
