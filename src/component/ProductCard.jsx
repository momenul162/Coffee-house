import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { Grid, IconButton } from "@mui/joy";
import { Favorite } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <Grid item lg={4} md={6} xs={12}>
      <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
        <CardOverflow>
          <Link to={`/coffee/${item._id}`}>
            <AspectRatio sx={{ minWidth: 200 }}>
              <img src={item.image} loading="lazy" alt="" />
            </AspectRatio>
          </Link>
          <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            sx={{
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "1rem",
              bottom: 0,
              transform: "translateY(50%)",
            }}
          >
            <Favorite />
          </IconButton>
        </CardOverflow>
        <Link to={`/coffee/${item._id}`}>
          <CardContent>
            <Typography level="h4">{item.name}</Typography>
            <Typography
              level="title-lg"
              sx={{ mt: 1, fontWeight: "xl", color: "salmon" }}
              endDecorator={
                <Chip component="span" size="sm" variant="soft" color="success">
                  Tax Included
                </Chip>
              }
            >
              $ {item.price}
            </Typography>
            <Typography level="body-sm">(Stock Available)</Typography>
          </CardContent>
        </Link>
        <CardOverflow>
          <Button variant="solid" sx={{ color: "white" }} size="lg">
            Add to cart
          </Button>
        </CardOverflow>
      </Card>
    </Grid>
  );
};

export default ProductCard;
