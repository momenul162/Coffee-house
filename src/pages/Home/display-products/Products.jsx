import React, { useState } from "react";
import ProductCard from "../../../component/ProductCard";
import { Pagination } from "@mui/material";
import useProducts from "../../../hooks/useProducts";
import Tabs from "@mui/joy/Tabs";
import { Container, Grid, Stack, Typography } from "@mui/joy";
import HomeTab from "../../../component/home-tab/HomeTab";
import SortSelect from "../../../component/select-sort/SortSelect";

const Products = () => {
  const [page, setPage] = useState(1);
  const [displayLimit, setDisplayLimit] = useState(9);
  const [tab, setTab] = useState("All");
  const { products, totalProduct, limit } = useProducts({ page, limit: displayLimit });

  const getLimit = (value) => {
    console.log("limit: ", value);
    setDisplayLimit(value);
  };

  const handleTab = (_e, newValue) => {
    setTab(newValue);
  };

  const handlePage = (_e, value) => {
    setPage(value);
  };

  const categoryByItem = products?.filter((item) => item.category.name === tab);

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

      <Grid container rowSpacing={2} columnSpacing={{ xs: 2, lg: 4, md: 3 }}>
        {tab === "All"
          ? products?.map((item) => <ProductCard key={item._id} item={item} />)
          : categoryByItem?.map((item) => <ProductCard key={item._id} item={item} />)}
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
