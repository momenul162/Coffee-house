import { createStore } from "easy-peasy";
import { productModel, userModel } from "../model/store-model";

const store = createStore({
  products: productModel,
  users: userModel,
});

export default store;
