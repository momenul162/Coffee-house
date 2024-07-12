import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useMemo } from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Aos from "aos";
import EmptyPageHandle from "../../utils/handle-empty-page/EmptyHandle";

const Carts = () => {
  const { user, loading: userLoading } = useStoreState((state) => state.currentUser);
  const { fetchCart } = useStoreActions((actions) => actions.carts);
  const { carts, loading } = useStoreState((state) => state.carts);

  useEffect(() => {
    if (user) {
      fetchCart({ userId: user?._id });
    }
  }, [user]);

  if (loading || userLoading) {
    return (
      <Container sx={{ mt: 20, mb: 8, textAlign: "center" }}>
        <CircularProgress thickness={4} size="lg" />
      </Container>
    );
  }

  const totalPrice = carts?.reduce((acc, cur) => acc + cur.itemId.price * cur.quantity, 0);

  Aos.init({
    duration: 1200,
  });

  const handleRemove = async (cart) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await deleteUser({ userId: user._id });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Deleted Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <Container sx={{ mt: 16, mb: 10 }}>
      {carts ? (
        <>
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
                  <caption>
                    <Typography textAlign={"center"} level="h3" sx={{ color: "violet" }}>
                      Your carts
                    </Typography>
                  </caption>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts &&
                      carts.map((cart) => (
                        <tr data-aos="fade-down" key={cart._id}>
                          <td>
                            <img width={75} src={cart.itemId.image} alt={cart.itemId.name} />
                          </td>
                          <td>{cart.quantity}</td>
                          <td>{cart.quantity * cart.itemId.price}</td>
                          <td>
                            <IconButton
                              disabled
                              variant="outlined"
                              color="danger"
                              size="sm"
                              onClick={() => handleRemove(cart)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </td>
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
                  <Typography level="h2" sx={{ display: "flex", gap: 1, color: "violet" }}>
                    <Stack color={"gold"}>$</Stack> {totalPrice}
                  </Typography>
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
                        ":hover": {
                          color: "rgba(158,22,17, 0.69)",
                          bgcolor: "rgba(68,42,107, 0.50)",
                        },
                      }}
                    >
                      Purchase Now
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <EmptyPageHandle message={"Your cart is empty. Please continue shop"} />
      )}
    </Container>
  );
};

export default Carts;
