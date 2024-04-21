import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "../../../component/UI/mui-table/table-styoe";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import Swal from "sweetalert2";
import axios from "axios";

const AllProduct = () => {
  const items = useProducts();

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
      const res = await axios.delete(`http://localhost:4000/admin/api/products/${item._id}`);

      if (res.status === 203) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.data.message}`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }
  };

  return (
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
          {items &&
            items.map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell align="left">
                  <img width={100} src={item.image} alt="" />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.name}
                </StyledTableCell>
                <StyledTableCell align="left">{item.category}</StyledTableCell>
                <StyledTableCell align="right">{item.price}</StyledTableCell>

                <StyledTableCell align="right">
                  <Link to={`/dashboard/products/${item._id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => handleRemove(item)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllProduct;
