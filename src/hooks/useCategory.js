import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const useCategory = () => {
  const { categories, loading } = useStoreState((state) => state.categories);
  const fetchCategories = useStoreActions((actions) => actions.categories.fetchCategories);

  useEffect(() => {
    fetchCategories({ url: "https://nexus-coffee-house-app.vercel.app/api/categories" });
  }, [fetchCategories]);

  return { categories, loading };
};

export default useCategory;
