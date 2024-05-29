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
import { Link, useNavigate } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import { baseURL } from "../utils/baseURL";
import Swal from "sweetalert2";

const ProductCard = ({ item }) => {
  const { user } = useStoreState((state) => state.currentUser);
  const navigate = useNavigate();

  const handleCart = (id) => {
    if (!user.email) {
      navigate("/auth/login");
    }
    const cartItem = { userId: user._id, itemId: id };
    baseURL.post("http://localhost:4000/api/carts", cartItem).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cart added successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <Grid item lg={4} md={6} xs={12}>
      <Card
        sx={{
          width: 320,
          maxWidth: "100%",
          WebKitCSSMatrix: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
          MozBoxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
          boxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
        }}
      >
        <CardOverflow>
          <Link to={`/coffee/${item._id}`}>
            <AspectRatio
              sx={{
                minWidth: 200,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.2)",
                },
                borderRadius: 10,
              }}
            >
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
          <Button
            onClick={() => handleCart(item._id)}
            variant="solid"
            sx={{ color: "white" }}
            size="lg"
          >
            Add to cart
          </Button>
        </CardOverflow>
      </Card>
    </Grid>
  );
};

export default ProductCard;
