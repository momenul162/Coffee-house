import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const useProducts = ({ page, limit, order = "asc" }) => {
  const { products } = useStoreState((state) => state.products);
  const fetchProducts = useStoreActions((actions) => actions.products.fetchProducts);

  useEffect(() => {
    fetchProducts({
      url: `http://localhost:4000/api/products?page=${page}&limit=${limit}&order=${order}`,
    });
  }, [fetchProducts, page, limit, order]);
  return products;
};

export default useProducts;
