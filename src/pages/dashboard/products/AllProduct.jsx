import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell } from "../../../component/UI/mui-table/table-styoe";
import { Pagination, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Stack } from "@mui/joy";
import CustomTableRow from "../../../component/table-row/TableRow";

const AllProduct = () => {
  const [page, setPage] = useState(1);
  const { products } = useStoreState((state) => state.products);
  const { fetchProducts } = useStoreActions((actions) => actions.products);
  const { deleteProduct } = useStoreActions((actions) => actions.products);

  const { products: items, totalProduct, limit } = products;

  useEffect(() => {
    fetchProducts({ limit: 10, page });
  }, [fetchProducts, page]);

  const handlePage = (_e, value) => {
    setPage(value);
  };

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
      await deleteProduct({ productId: item._id, limit: 10, page });

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
      <TableContainer component={Paper}>
        <Typography textAlign="center" variant="h4">
          All Product Here
        </Typography>
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>

              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) => (
              <CustomTableRow key={item._id} item={item} getDeleteData={handleRemove} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={4} alignItems={"center"} mt={4}>
        <Pagination
          onChange={handlePage}
          page={page}
          count={Math.ceil(totalProduct / limit)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default AllProduct;
