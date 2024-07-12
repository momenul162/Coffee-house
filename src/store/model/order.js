import { action, thunk } from "easy-peasy";
import { baseURL } from "../../utils/baseURL";

export const orderModel = {
  allOrders: null,
  orders: null,
  error: null,
  loading: false,

  setError: action((state, payload) => {
    state.error = payload;
  }),

  setAllOrders: action((state, payload) => {
    state.allOrders = payload;
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  // setUpdateOrder: action((state, payload) => {
  //   const previousIndex = [...state.allOrders].findIndex((order) => order._id === payload._id);

  //   if (previousIndex !== -1) {
  //     state.allOrders[previousIndex] = payload;
  //   }
  // }),

  setOrders: action((state, payload) => {
    state.orders = payload;
  }),

  fetchAllOrders: thunk(async (actions) => {
    actions.setLoading(true);
    try {
      const { data } = await baseURL.get("/api/admin/orders");
      actions.setAllOrders(data);
      actions.setError(null);
      actions.setLoading(false);
    } catch (error) {
      actions?.setError(error.response?.data?.message);
    }
  }),

  fetchOrders: thunk(async (actions, { userId }) => {
    actions.setLoading(true);
    try {
      const { data } = await baseURL.get(`/api/orders/${userId}`);

      actions?.setOrders(data);
      actions?.setError(null);
      actions.setLoading(false);
    } catch (error) {
      actions.setError(error.response?.data?.message);
    }
  }),

  updateOrder: thunk(async (actions, { orderId, status, userId }) => {
    try {
      const { data } = await baseURL.patch(`/api/admin/orders/${orderId}`, { status });
      if (data._id) {
        actions?.fetchAllOrders({ userId });
        actions?.setError(null);
      }
    } catch (error) {
      actions?.setError(error.response?.data?.message);
    }
  }),
};
