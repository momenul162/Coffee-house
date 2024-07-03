import { Add } from "@mui/icons-material";
import { Button, Container, Table, Typography } from "@mui/joy";
import Aos from "aos";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { orders } = useStoreState((state) => state.orders);
  const { fetchOrders } = useStoreActions((actions) => actions.orders);
  const { user } = useStoreState((state) => state.currentUser);

  useEffect(() => {
    fetchOrders({ userId: user._id });
  }, [fetchOrders, user]);

  Aos.init({
    duration: 1200,
  });

  return (
    <Container>
      <Table sx={{ my: 10, textAlign: "center" }} borderAxis="bothBetween">
        <caption>Nutrition of your favorite menus.</caption>
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
                        <Link to={`/api/reviews/${order._id}`}>
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
    </Container>
  );
};

export default MyOrders;
