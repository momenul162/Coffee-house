import { Add } from "@mui/icons-material";
import { Button, CircularProgress, Container, Table, Typography } from "@mui/joy";
import Aos from "aos";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EmptyPageHandle from "../../utils/handle-empty-page/EmptyHandle";

const MyOrders = () => {
  const { orders, loading } = useStoreState((state) => state.orders);
  const { fetchOrders } = useStoreActions((actions) => actions.orders);
  const { user, loading: userLoading } = useStoreState((state) => state.currentUser);

  useEffect(() => {
    if (user) {
      fetchOrders({ userId: user._id });
    }
  }, [user]);

  if (loading || userLoading) {
    return (
      <Container sx={{ mt: 20, mb: 8, textAlign: "center" }}>
        <CircularProgress thickness={4} size="lg" />
      </Container>
    );
  }

  Aos.init({
    duration: 1200,
  });

  return (
    <Container sx={{ mt: 16, mb: 10 }}>
      {orders ? (
        <>
          <Table sx={{ textAlign: "center" }} borderAxis="bothBetween">
            <caption>
              <Typography textAlign="center" level="h3" sx={{ mb: 4, color: "violet" }}>
                Your orders History
              </Typography>
            </caption>
            <thead>
              <tr>
                <th>Product</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order?._id} data-aos="fade-down">
                  <td>
                    {order?.productId.map((product) => (
                      <tr key={product._id}>
                        <Link
                          to={`/coffee/${product._id}`}
                          style={{
                            textDecoration: "none",
                            display: "flex",
                            gap: "20px",
                            alignItems: "center",
                            padding: "35px 10px",
                          }}
                        >
                          <td>
                            <img width={70} height={70} src={product?.image} alt={product?.name} />
                          </td>
                          <td style={{ display: "flex", flexDirection: "column" }}>
                            <Typography color="warning">{product.name}</Typography>
                            <Typography color="danger">$ {product.price}</Typography>
                            <Typography color="neutral">
                              {" "}
                              {new Date(order?.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </Typography>
                          </td>
                        </Link>

                        <td>
                          {order.status === "Delivered" && (
                            <Link to={`/api/reviews/${product._id}`}>
                              <Button variant="outlined" color="success" startDecorator={<Add />}>
                                Review
                              </Button>
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <EmptyPageHandle message={"Product not available for review. Please purchase product"} />
      )}
    </Container>
  );
};

export default MyOrders;
