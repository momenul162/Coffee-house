import { Box, Card, CardContent, CardOverflow, Divider, Typography } from "@mui/joy";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";

const Overview = () => {
  const { products, loading } = useStoreState((state) => state?.products);
  const { fetchProducts } = useStoreActions((actions) => actions?.products);

  const { products: items } = products;

  useEffect(() => {
    fetchProducts({ limit: 0, page: 0 });
  }, []);

  return (
    <Box>
      <Card sx={{ borderRadius: 5, maxWidth: "100%" }}>
        <CardContent>
          <Typography level="title-lg" sx={{ my: 2, fontSize: "1.5rem" }} textAlign={"center"}>
            Product Overview
          </Typography>
        </CardContent>
        <CardOverflow
          variant="soft"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            justifyContent: "space-around",
            py: 1,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography level="title-sm">Total Products: {items?.length}</Typography>
          <Divider orientation="vertical" />
          <Typography level="title-sm">Total Sold: 9</Typography>
          <Divider orientation="vertical" />
          <Typography level="title-sm">Total Earn: 32</Typography>
        </CardOverflow>
      </Card>
    </Box>
  );
};

export default Overview;
