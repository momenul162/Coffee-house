import React, { useEffect, useState } from "react";
import ProductCard from "../../../component/ProductCard";
import { Container, Grid, InputLabel, Pagination } from "@mui/material";
import useProducts from "../../../hooks/useProducts";
import Tabs from "@mui/joy/Tabs";
import { Box, FormControl, MenuItem, Select, Stack } from "@mui/joy";
import HomeTab from "../../../component/home-tab/HomeTab";

const Products = () => {
  const [page, setPage] = useState(1);
  const [displayLimit, setDisplayLimit] = useState(9);

  const { products, totalProduct, limit } = useProducts({ page, limit: displayLimit });

  const handleLimit = (event) => {
    setDisplayLimit(event?.target?.value);
  };

  const handlePage = (e, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth={"xl"} sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ mb: 1 }}>
          <HomeTab />
        </Tabs>

        <FormControl sx={{ mr: 15, mb: 2, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            label="Sort"
            value={displayLimit}
            onChange={handleLimit}
          >
            <MenuItem value={6}>Six</MenuItem>
            <MenuItem value={9}>Nine</MenuItem>
            <MenuItem value={12}>Twelve</MenuItem>
            <MenuItem value={18}>Eighteen</MenuItem>
            <MenuItem value={24}>Twenty Four</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid alignItems={"center"} container rowSpacing={2} columnSpacing={{ xs: 2, lg: 4, md: 3 }}>
        {products && products.map((item) => <ProductCard key={item._id} item={item} />)}
      </Grid>
      <Stack spacing={4} alignItems={"center"} mt={4}>
        <Pagination
          onChange={handlePage}
          page={page}
          count={Math.ceil(totalProduct / limit)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack>
    </Container>
  );
};

export default Products;
