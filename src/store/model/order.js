import { action, thunk } from "easy-peasy";
import { baseURL } from "../../utils/baseURL";

export const orderModel = {
  allOrders: [],
  orders: [],
  error: null,

  setError: action((state, payload) => {
    state.error = payload;
  }),

  setAllOrders: action((state, payload) => {
    state.allOrders = payload;
  }),

  setOrders: action((state, payload) => {
    state.orders = payload;
  }),

  fetchAllOrders: thunk(async (actions) => {
    try {
      const { data } = await baseURL.get("/api/admin/orders");
      actions.setAllOrders(data);
      actions.setError(null);
    } catch (error) {
      actions?.setError(error.response?.data?.message);
    }
  }),

  fetchOrders: thunk(async (actions, { userId }) => {
    try {
      const { data } = await baseURL.get(`/api/orders/${userId}`);

      actions?.setOrders(data);
      actions?.setError(null);
    } catch (error) {
      actions.setError(error.response?.data?.message);
    }
  }),

  updateOrder: thunk(async (actions, { orderId, status, userId }) => {
    try {
      await baseURL.patch(`/api/admin/orders/${orderId}`, { status });
      actions?.fetchOrders({ userId });
      actions?.setError(null);
    } catch (error) {
      actions?.setError(error.response?.data?.message);
    }
  }),
};
