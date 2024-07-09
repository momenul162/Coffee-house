import { action, thunk } from "easy-peasy";
import { baseURL } from "../../utils/baseURL";
import e from "cors";

export const userModel = {
  users: null,
  error: null,

  setError: action((state, payload) => {
    state.error = payload;
  }),

  setUser: action((state, payload) => {
    state.users = payload;
  }),

  fetchUser: thunk(async (actions, payload) => {
    try {
      const { data } = await baseURL.get("/api/users", payload);
      console.log(data);
      actions?.setUser(data);
      actions?.setError(null);
    } catch (error) {
      actions?.setError(error.response?.data?.message);
    }
  }),

  updateUser: thunk(async (actions, { userId, roles }) => {
    try {
      await baseURL.patch(`/admin/api/users/${userId}`, { roles });
      actions?.fetchUser();
      actions?.setError(null);
    } catch (error) {
      actions?.setError(error.response?.data?.message);
    }
  }),

  deleteUser: thunk(async (actions, payload) => {
    try {
      await baseURL.delete(`/admin/api/users/${payload.userId}`);
      actions?.fetchUser();
      actions?.setError(null);
    } catch (error) {
      actions?.setError(error.response?.data?.message);
    }
  }),
};

export const currentUserModel = {
  user: null,
  error: null,
  loading: false,

  setUser: action((state, payload) => {
    state.user = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  fetchCurrentUser: thunk(async (actions) => {
    try {
      actions.setLoading(true);

      const { data } = await baseURL.get("/api/current/user");
      actions?.setUser(data);

      actions.setLoading(false);
      actions?.setError(null);
    } catch (error) {
      actions?.setError(error.response?.data?.message);
      actions.setLoading(false);
    }
  }),
};
