import { createStore } from "easy-peasy";
import { productModel, searchProductById } from "../model/product";
import { currentUserModel, userModel } from "../model/user";
import { categoryModel } from "../model/category";
import { orderModel } from "../model/order";
import { reviewModel } from "../model/review";
import { cartModel } from "../model/cart";

const store = createStore({
  products: productModel,
  product: searchProductById,
  users: userModel,
  currentUser: currentUserModel,
  categories: categoryModel,
  orders: orderModel,
  reviews: reviewModel,
  carts: cartModel,
});

export default store;
