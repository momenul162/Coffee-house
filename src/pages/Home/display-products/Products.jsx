import React from "react";
import ProductCard from "../../../component/ProductCard";
import { Container, Grid } from "@mui/material";
import useProducts from "../../../hooks/useProducts";

const Products = () => {
  const products = useProducts();

  return (
    <Container maxWidth={"xl"} sx={{ mt: 4 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 2, lg: 4, md: 3 }}>
        {products &&
          products.map((item) => (
            <ProductCard
              key={item._id}
              name={item.name}
              price={item.price}
              supplier={item.supplier}
            />
          ))}
      </Grid>
    </Container>
  );
};

export default Products;
