import { action, thunk } from "easy-peasy";
import { baseURL } from "../../utils/baseURL";

export const reviewModel = {
  reviews: [],
  error: null,

  setReviews: action(async (state, payload) => {
    state.reviews = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  fetchReview: thunk(async (actions, { productId }) => {
    try {
      const { data } = await baseURL.get(`/api/reviews/${productId}`);
      actions.setReviews(data);
      actions.setError(null);
    } catch (error) {
      actions.setError(error.response?.data?.message);
    }
  }),

  postReview: thunk(async (actions, payload) => {
    console.log(payload);
    try {
      await baseURL.post("/api/reviews", payload);
      actions.setReviews({ productId: payload.productId });
      actions.setError(null);
    } catch (error) {
      actions.setError(error.response?.data?.message);
    }
  }),
};
