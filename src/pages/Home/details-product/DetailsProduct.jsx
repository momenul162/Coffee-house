import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useStoreActions, useStoreState } from "easy-peasy";
import Aos from "aos";

const DetailsProduct = () => {
  const { id } = useParams();
  const { product } = useStoreState((state) => state.product);
  const { fetchProduct } = useStoreActions((actions) => actions.product);

  useEffect(() => {
    fetchProduct({ productId: id });
  }, [id]);

  Aos.init({
    duration: 1200,
  });

  return (
    <Container sx={{ backgroundColor: "#F4F3F0", my: 10, py: 4 }}>
      <Link to="/">
        <Typography
          sx={{ display: "flex", alignItems: "center", mb: 2, "&:hover": { color: "Highlight" } }}
        >
          <KeyboardBackspaceIcon /> Back to Home
        </Typography>
      </Link>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Box data-aos="fade-right">
          <img height={455} width={355} src={product?.image} alt="" />
        </Box>
        <Box data-aos="fade-left" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4">Name: {product?.name}</Typography>
          <Typography variant="h4">Supplier: {product?.supplier}</Typography>
          <Typography variant="h4">Taste: {product?.taste}</Typography>
          <Typography variant="h4">Category: {product?.category}</Typography>
          <Typography variant="h4">Price: {product?.price}</Typography>
          <Typography variant="h4">Details: {product?.details}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default DetailsProduct;
