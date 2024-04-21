import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import { Box, Container, Stack, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";

const DetailsProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(async () => {
    const product = await axios.get(`http://localhost:4000/api/products/${id}`);
    setProduct(product);

    return product;
  }, [id]);

  return (
    <Container sx={{ backgroundColor: "#F4F3F0", my: 10, py: 4 }}>
      <Link to="/">
        <Typography>
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
        <Box>
          <img height={455} width={355} src={product?.image} alt="" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
