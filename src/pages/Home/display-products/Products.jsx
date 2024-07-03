import React, { useEffect, useState } from "react";
import ProductCard from "../../../component/ProductCard";
import { Pagination } from "@mui/material";
import Tabs from "@mui/joy/Tabs";
import { Container, Grid, Stack, Typography } from "@mui/joy";
import HomeTab from "../../../component/home-tab/HomeTab";
import SortSelect from "../../../component/select-sort/SortSelect";
import { useStoreActions, useStoreState } from "easy-peasy";

const Products = () => {
  const [page, setPage] = useState(1);
  const [displayLimit, setDisplayLimit] = useState(9);
  const [tab, setTab] = useState("All");
  const { products } = useStoreState((state) => state.products);
  const { fetchProducts } = useStoreActions((actions) => actions.products);

  const { products: items, totalProduct, limit } = products;

  useEffect(() => {
    fetchProducts({ limit: displayLimit, page });
  }, [fetchProducts, page, displayLimit]);

  const getLimit = (value) => {
    setDisplayLimit(value);
  };

  const handleTab = (_e, newValue) => {
    setTab(newValue);
  };

  const handlePage = (_e, value) => {
    setPage(value);
  };

  const categoryByItem = items?.filter((item) => item.category.name === tab);

  let pageCount = Math.ceil(totalProduct / limit);
  if (isNaN(pageCount) || pageCount < 1) {
    pageCount = 1;
  }

  return (
    <Container maxWidth={"xl"} sx={{ mt: 4 }}>
      <Tabs
        onChange={handleTab}
        aria-label="Basic tabs"
        value={tab}
        sx={{ display: "flex", flexDirection: { md: "row" }, justifyContent: "center", mb: 1 }}
      >
        <HomeTab />
        <SortSelect value={displayLimit} getLimit={getLimit} />
      </Tabs>
      {tab === "All" ? (
        <Typography>Total Items: {totalProduct}</Typography>
      ) : (
        <Typography>
          {categoryByItem?.length === 0 ? (
            <Typography level="h3" textAlign={"center"}>
              This items not available
            </Typography>
          ) : (
            "Total Items: " + categoryByItem.length
          )}
        </Typography>
      )}
      <Grid container id="products" rowSpacing={2} columnSpacing={{ xs: 2, lg: 4, md: 3 }}>
        {tab === "All"
          ? items?.map((item) => <ProductCard key={item._id} item={item} />)
          : categoryByItem?.map((item) => <ProductCard key={item._id} item={item} />)}
      </Grid>
      <Stack spacing={4} alignItems={"center"} mt={4}>
        <Pagination
          onChange={handlePage}
          page={page}
          count={pageCount}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack>
    </Container>
  );
};

export default Products;
