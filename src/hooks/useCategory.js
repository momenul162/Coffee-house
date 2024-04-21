import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const useCategory = () => {
  const { categories } = useStoreState((state) => state.categories);
  const fetchCategories = useStoreActions((actions) => actions.categories.fetchCategories);

  useEffect(() => {
    fetchCategories({ url: "http://localhost:4000/api/categories" });
  }, [fetchCategories]);

  return categories;
};

export default useCategory;
