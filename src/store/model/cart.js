import { action, thunk } from "easy-peasy";
import { baseURL } from "../../utils/baseURL";

export const cartModel = {
  carts: null,
  error: null,
  loading: false,

  setCarts: action((state, payload) => {
    state.carts = payload;
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  setErrors: action((state, payload) => {
    state.error = payload;
  }),

  fetchCart: thunk(async (actions, { userId }) => {
    actions.setLoading(true);
    try {
      const { data } = await baseURL.get(`/api/carts/${userId}`);
      actions.setCarts(data);
      actions.setErrors(null);
      actions.setLoading(false);
    } catch (error) {
      actions.setErrors(error.response.data.message);
      actions.setLoading(false);
    }
  }),

  removeFromCarts: thunk(async (actions, { cartId, userId }) => {
    console.log(cartId, userId);
    try {
      await baseURL.delete(`/api/carts/${cartId}`);
      actions.fetchCart({ userId });
      actions.setErrors(null);
    } catch (error) {
      actions.setErrors("Something went wrong");
    }
  }),

  postCart: thunk(async (actions, payload) => {
    try {
      const { data } = await baseURL.post("/api/carts", payload);

      if (data._id) {
        actions?.fetchCart({ userId: payload.userId });
        actions?.setErrors(null);
      }
    } catch (error) {
      actions?.setErrors(error.response.data.message);
    }
  }),
};
