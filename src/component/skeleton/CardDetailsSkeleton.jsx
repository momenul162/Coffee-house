import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function ProductDetailsCardSkeleton() {
  return (
    <Card sx={{ display: "flex", maxWidth: 800, margin: "auto", mt: 10, mb: 4 }}>
      <Box
        sx={{
          width: 300,
          height: 450,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {" "}
        {/* Set dimensions here */}
        <CardMedia
          component={() => <Skeleton variant="rectangular" width="100%" height="100%" />} // Skeleton fills Box
          sx={{ width: "100%", height: "100%" }} // Media fills Box
        />
      </Box>
      <CardContent sx={{ flex: 1, padding: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Skeleton variant="text" height={40} width="50%" />
          <Skeleton variant="text" height={20} width="70%" />
          <Skeleton variant="text" height={20} width="40%" />
          <Skeleton variant="text" height={20} width="60%" />
          <Skeleton variant="text" height={40} width="30%" />
          <Box sx={{ flexGrow: 1 }} />
          <Skeleton variant="text" height={80} />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Skeleton variant="rectangular" width={100} height={40} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// Example usage:
<ProductDetailsCardSkeleton />;
