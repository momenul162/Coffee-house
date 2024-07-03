import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/joy";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import { Link } from "react-router-dom";
import Aos from "aos";

const Carts = () => {
  const { user } = useStoreState((state) => state.currentUser);
  const { fetchCart } = useStoreActions((actions) => actions.carts);
  const { carts } = useStoreState((state) => state.carts);

  useEffect(() => {
    fetchCart({ userId: user._id });
  }, [user?.email]);

  const totalPrice = carts?.reduce((acc, cur) => acc + cur.itemId.price * cur.quantity, 0);

  Aos.init({
    duration: 1200,
  });

  return (
    <Container sx={{ my: 20 }}>
      <Typography fontSize="lg" textAlign="center">
        CART
      </Typography>

      <Grid container spacing={4}>
        <Grid sm={8} md={7}>
          <Sheet
            color="primary"
            invertedColors
            sx={{
              pt: 1,
              borderRadius: "sm",
              transition: "0.3s",
            }}
          >
            <Table stripe="odd" hoverRow>
              <caption>Nutrition of your favorite menus.</caption>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {carts?.map((cart) => (
                  <tr data-aos="fade-down" key={cart._id}>
                    <td>
                      <img width={75} src={cart.itemId.image} alt={cart.itemId.name} />
                    </td>
                    <td>{cart.quantity}</td>
                    <td>{cart.quantity * cart.itemId.price}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
        </Grid>
        <Grid sm={4} md={5}>
          <Card
            color="primary"
            invertedColors
            sx={{
              boxShadow: "lg",
              width: 370,
              maxWidth: "100%",
              // to make the demo resizeable
              overflow: "auto",
              resize: "horizontal",
            }}
          >
            <Typography fontSize="lg" textAlign="center">
              Place Order
            </Typography>
            <div>
              <Typography level="h2">$ {totalPrice}</Typography>
            </div>
            <CardContent>
              <Typography level="title-lg">Individual License</Typography>
            </CardContent>
            <CardActions>
              <Link to={"/payments"}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "rgba(68,42,107, 0.96)",
                    ":hover": { color: "rgba(158,22,17, 0.69)", bgcolor: "rgba(68,42,107, 0.50)" },
                  }}
                >
                  Purchase Now
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Carts;
