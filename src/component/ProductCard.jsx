import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import img from "../assets/coffee-logo.png";
import { Grid } from "@mui/material";

const ProductCard = ({ name, price, supplier }) => {
  return (
    <Grid item lg={4} md={6} xs={12}>
      <Card sx={{ display: "flex", bgcolor: "whitesmoke" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={img}
          alt="Live from space album cover"
        />
        <Box
          flexGrow={1}
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="subtitle1">
              Name: {name}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Price: {price}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Supplier: {supplier}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", pl: 1, pb: 1 }}>
            <IconButton>
              <VisibilityIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default ProductCard;
