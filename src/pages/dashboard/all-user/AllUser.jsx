import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { StyledTableCell, StyledTableRow } from "../../../component/UI/mui-table/table-styoe";
import { Container, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Modal } from "@mui/joy";

const AllUser = () => {
  const users = useUser();
  const [open, setOpen] = useState(false);

  const handleRemove = async (user) => {
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
      const res = await axios.delete(`http://localhost:4000/admin/api/users/${user._id}`);

      if (res.status === 203) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.data}`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Typography textAlign="center" variant="h4">
          All User Here
        </Typography>
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell component="th" scope="row">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">{user.roles}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={`/dashboard/users/${user._id}`}>
                      <Box>
                        <IconButton onClick={() => setOpen(true)}>
                          <EditIcon />
                        </IconButton>
                        <Modal open={open} onClose={() => setOpen(false)}></Modal>
                      </Box>
                    </Link>

                    <IconButton onClick={() => handleRemove(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllUser;
