import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  Table,
} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";

const AllProduct = () => {
  const [page, setPage] = useState(1);
  const { products, loading } = useStoreState((state) => state?.products);
  const { fetchProducts } = useStoreActions((actions) => actions?.products);
  const { deleteProduct } = useStoreActions((actions) => actions?.products);

  useEffect(() => {
    fetchProducts({ limit: 10, page });
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress thickness={4} size="lg" />
      </Container>
    );
  }

  const handleRemove = async (item) => {
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
      await deleteProduct({ productId: item?._id, limit: 10, page });

      Swal.fire({
        position: "center",
        icon: "success",
        title: `Product deleted successfully`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <Box>
      <Table borderAxis="xBetween" variant="outlined">
        <caption>All Product here, you can do anything!</caption>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.products.map((item) => (
              <tr key={item._id}>
                <td scope="row">
                  <img width={100} height={120} src={item?.image} alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item?.category?.name}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={`/dashboard/products/${item?._id}`}>
                    <IconButton sx={{ mr: 2 }} variant="soft" color="primary" size="sm">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    variant="soft"
                    color="danger"
                    size="sm"
                    onClick={() => handleRemove(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* <Stack spacing={4} alignItems={"center"} mt={4}>
        <Pagination
          onChange={handlePage}
          page={page}
          count={Math.ceil(products?.totalProduct / products?.limit)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack> */}
    </Box>
  );
};

export default AllProduct;
