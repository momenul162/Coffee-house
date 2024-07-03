import { action, thunk } from "easy-peasy";
import { baseURL } from "../../utils/baseURL";

export const cartModel = {
  carts: [],
  error: null,

  setCarts: action((state, payload) => {
    state.carts = payload;
  }),
  setErrors: action((state, payload) => {
    state.error = payload;
  }),

  fetchCart: thunk(async (actions, { userId }) => {
    try {
      const { data } = await baseURL.get(`/api/carts/${userId}`);
      actions?.setCarts(data);
      actions?.setErrors(null);
    } catch (error) {
      actions?.setErrors(error.response.data.message);
    }
  }),

  postCart: thunk(async (actions, payload) => {
    try {
      await baseURL.post("/api/carts", payload);
      actions?.fetchCart(payload.userId);
      actions?.setErrors(null);
    } catch (error) {
      actions?.setErrors(error.response.data.message);
    }
  }),
};
