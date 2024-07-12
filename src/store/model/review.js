import { action, thunk } from "easy-peasy";
import { baseURL } from "../../utils/baseURL";

export const reviewModel = {
  reviews: null,
  error: null,
  loading: false,

  setReviews: action(async (state, payload) => {
    state.reviews = payload;
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  fetchReview: thunk(async (actions, { productId }) => {
    actions.setLoading(true);
    try {
      const { data } = await baseURL.get(`/api/reviews/${productId}`);
      actions.setReviews(data);
      actions.setError(null);
      actions.setLoading(false);
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
