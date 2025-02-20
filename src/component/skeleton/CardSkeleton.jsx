import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CardActions, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function ProductCardSkeleton() {
  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component={() => <Skeleton variant="rectangular" height={140} />} height={140} />
        <CardContent>
          <Skeleton variant="text" height={40} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Skeleton variant="text" height={20} width="50%" />
            <Skeleton variant="text" height={20} width="70%" />
          </Box>
        </CardContent>
        <CardActions>
          <Skeleton variant="rectangular" width={80} height={30} />
          <Skeleton variant="circular" width={30} height={30} />
        </CardActions>
      </Card>
    </Grid>
  );
}
