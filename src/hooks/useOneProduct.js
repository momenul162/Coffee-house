import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const useOneProduct = ({ id }) => {
  const { products } = useStoreState((state) => state.products);
  const fetchProducts = useStoreActions((actions) => actions.products.fetchProducts);

  useEffect(() => {
    fetchProducts({
      url: `http://localhost:4000/api/products/${id}`,
    });
  }, [fetchProducts, id]);
  return products;
};

export default useOneProduct;
