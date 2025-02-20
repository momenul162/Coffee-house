import React, { useEffect } from "react";
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
import { useStoreActions, useStoreState } from "easy-peasy";
import Swal from "sweetalert2";
import Aos from "aos";

const ProductCard = ({ item }) => {
  const { user } = useStoreState((state) => state.currentUser);
  const { postCart } = useStoreActions((actions) => actions.carts);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  const handleCart = (id) => {
    if (!user?.email) {
      navigate("/auth/login");
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please Login",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      postCart({ userId: user._id, itemId: id });
    }
  };

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card
        data-aos="zoom-in"
        sx={{
          width: 320,
          maxWidth: "100%",
          boxShadow: "0px 0px 15px rgba(37,20,100, 0.2)",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": { boxShadow: "0px 0px 25px rgba(37,20,100, 0.4)" },
        }}
      >
        <CardOverflow>
          <Link to={`/coffee/${item._id}`}>
            <AspectRatio
              sx={{
                minWidth: "100%",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.1)" },
                borderRadius: 2,
              }}
            >
              <img src={item.image} loading="lazy" alt={item.name} />
            </AspectRatio>
          </Link>
          <IconButton
            aria-label="Like"
            size="md"
            variant="solid"
            sx={{
              position: "absolute",
              borderRadius: "50%",
              right: "1rem",
              bottom: "-1rem",
              backgroundColor: "white",
            }}
          >
            <Favorite color="error" />
          </IconButton>
        </CardOverflow>
        <Link to={`/coffee/${item._id}`} style={{ textDecoration: "none" }}>
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
              ${item.price}
            </Typography>
            <Typography level="body-sm">(Stock Available)</Typography>
          </CardContent>
        </Link>
        <CardOverflow>
          <Button
            variant="soft"
            onClick={() => handleCart(item._id)}
            sx={{
              color: "rgba(68,42,107, 0.96)",
              ":hover": {
                color: "rgba(158,22,17, 0.69)",
                bgcolor: "rgba(68,42,107, 0.50)",
              },
            }}
            size="lg"
          >
            Add to Cart
          </Button>
        </CardOverflow>
      </Card>
    </Grid>
  );
};

export default ProductCard;
