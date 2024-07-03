import { Button, Container, Table, Typography } from "@mui/joy";
import Aos from "aos";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";

const Orders = () => {
  const { allOrders } = useStoreState((state) => state?.orders);
  const { fetchAllOrders } = useStoreActions((actions) => actions.orders);
  const { updateOrder } = useStoreActions((actions) => actions.orders);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const handleStatus = (id, status, userId) => {
    console.log("Status= ", status, id);
    if (status === "Pending") {
      updateOrder({ status: "Order-place", orderId: id, userId });
    } else if (status === "Order-place") {
      updateOrder({ status: "Delivered", orderId: id, userId });
    }
  };

  Aos.init({
    duration: 1200,
  });

  return (
    <Container>
      <Table hoverRow>
        <caption>Nutrition of your favorite menus.</caption>
        <thead>
          <tr>
            <th>Product</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allOrders?.map((order) => (
            <tr key={order?._id}>
              <td>
                {order?.productId.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img width={70} src={product?.image} alt={product?.name} />
                    </td>
                    <td>
                      <Typography>{product.name}</Typography>
                      <Typography color="success">$ {product.price}</Typography>
                    </td>
                  </tr>
                ))}
              </td>
              <td>
                {new Date(order?.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td>
                <Button
                  disabled={order.status === "Delivered"}
                  onClick={() => handleStatus(order._id, order.status, order.userId)}
                  variant="outlined"
                  fullWidth
                >
                  {(order.status === "Pending" && "Accept Order") ||
                    (order.status === "Order-place" && "Order Success") ||
                    "Delivered"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Orders;
