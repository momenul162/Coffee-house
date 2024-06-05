import { action, thunk } from "easy-peasy";
import { baseURL } from "../../utils/baseURL";

export const userModel = {
  users: [],

  setUser: action((state, payload) => {
    state.users = payload;
  }),

  fetchUser: thunk(async (actions, payload) => {
    try {
      const { data } = await baseURL.get("/api/users", payload);
      actions.setUser(data);
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  }),

  deleteUser: thunk(async (actions, payload) => {
    try {
      await baseURL.delete(`/admin/api/users/${payload.userId}`);
      actions.fetchUser();
    } catch (error) {
      console.log(error);
    }
  }),
};

export const currentUserModel = {
  user: {},

  setUser: action((state, payload) => {
    state.user = payload;
  }),

  fetchCurrentUser: thunk(async (actions) => {
    try {
      const { data } = await baseURL.get("/api/current/user");
      actions.setUser(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }),
};
