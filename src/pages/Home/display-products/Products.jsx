import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../../../component/ProductCard";
import { Pagination } from "@mui/material";
import Tabs from "@mui/joy/Tabs";
import { Box, Container, Grid, Stack, Typography } from "@mui/joy";
import HomeTab from "../../../component/home-tab/HomeTab";
import SortSelect from "../../../component/select-sort/SortSelect";
import { useStoreActions, useStoreState } from "easy-peasy";
import ProductCardSkeleton from "../../../component/skeleton/CardSkeleton";

const Products = () => {
  const [page, setPage] = useState(1);
  const [displayLimit, setDisplayLimit] = useState(12);
  const [tab, setTab] = useState("All");

  const { products, loading } = useStoreState((state) => state?.products);
  const { fetchProducts } = useStoreActions((actions) => actions?.products);

  useEffect(() => {
    if (!displayLimit) return; // Prevent calling fetchProducts if displayLimit is undefined
    fetchProducts({ limit: displayLimit, page });
  }, [displayLimit, page, fetchProducts]);

  const getLimit = (value) => setDisplayLimit(value);
  const handleTab = (_e, newValue) => setTab(newValue);
  const handlePage = (_e, value) => setPage(value);

  const categoryByItem = useMemo(() => {
    return products?.products?.filter((item) => item?.category?.name === tab) || [];
  }, [products, tab]);

  let pageCount = Math.ceil(products?.totalProduct / products?.limit);
  pageCount = isNaN(pageCount) || pageCount < 1 ? 1 : pageCount;

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {/* Sorting & Total Items */}
      <Box sx={{ display: "flex", gap: 4, alignItems: "baseline" }}>
        <SortSelect value={displayLimit} getLimit={getLimit} />
        <Typography>
          {tab === "All"
            ? `Total Items: ${products?.totalProduct || 0}`
            : categoryByItem.length
            ? `Total Items: ${categoryByItem.length}`
            : "This item is not available"}
        </Typography>
      </Box>

      {/* Tabs & Product Grid */}
      <Box sx={{ display: { md: "flex" }, gap: { xs: 1, md: 3, lg: 4 } }}>
        <Tabs onChange={handleTab} value={tab} sx={{ mb: 1 }}>
          <HomeTab />
        </Tabs>

        <Grid container id="products" rowSpacing={3} columnSpacing={3} sx={{ flexGrow: 1 }}>
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                  <ProductCardSkeleton />
                </Grid>
              ))
            : (tab === "All" ? products?.products : categoryByItem)?.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}

          {/* Add empty Grid items to maintain layout structure if fewer than 4 items */}
          {categoryByItem.length > 0 &&
            categoryByItem.length < 4 &&
            Array.from({ length: 4 - categoryByItem.length }).map((_, index) => (
              <Grid key={`empty-${index}`} item lg={3} md={4} sm={6} xs={12} />
            ))}
        </Grid>
      </Box>

      {/* Pagination */}
      <Stack spacing={4} alignItems="center" mt={4}>
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
