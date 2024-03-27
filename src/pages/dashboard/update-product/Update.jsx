import React from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";

const Update = () => {
  const { id } = useParams();
  const products = useProducts();

  const product = products?.find((item) => item._id === id);

  console.log(product);

  return (
    <div>
      <h1>UPdate product</h1>
    </div>
  );
};

export default Update;
