import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/joy";
import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import { baseURL } from "../../utils/baseURL";
import { Link } from "react-router-dom";

const Carts = () => {
  const { user } = useStoreState((state) => state.currentUser);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      baseURL.get(`/api/carts/${user._id}`).then((res) => {
        setCarts(res.data);
      });
    }
  }, [user.email]);

  console.log(carts);

  const totalPrice = carts?.reduce((acc, cur) => acc + cur.itemId.price * cur.quantity, 0);

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
                  <tr key={cart._id}>
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
                <Button sx={{ bgcolor: "rgba(37,20,100, 0.60)" }}>Purchase Now</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Carts;
