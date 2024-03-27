import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const useProducts = () => {
  const { products } = useStoreState((state) => state.products);
  const fetchProducts = useStoreActions((actions) => actions.products.fetchProducts);

  useEffect(() => {
    fetchProducts({ url: "http://localhost:4000/api/products" });
  }, [fetchProducts]);

  return products;
};

export default useProducts;
