import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import Aos from "aos";
import { Container, IconButton, Modal, Table } from "@mui/joy";

const AllUser = () => {
  const [open, setOpen] = useState(false);
  const { users } = useStoreState((state) => state?.users);
  const { fetchUser, deleteUser } = useStoreActions((actions) => actions.users);

  useEffect(() => {
    fetchUser();
  }, [open]);

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

  Aos.init({
    duration: 1200,
  });

  return (
    <Container>
      <Table borderAxis="bothBetween" stickyHeader>
        <caption>All Product here, you can do anything!</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user?.name}</td>
                <td>{user.email}</td>
                <td>{user?.roles}</td>
                <td>
                  <Link to={`/dashboard/users/${user?._id}`}>
                    <IconButton
                      // onClick={() => setOpen(true)}
                      sx={{ mr: 2 }}
                      variant="soft"
                      color="primary"
                      size="sm"
                    >
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    variant="soft"
                    color="danger"
                    size="sm"
                    onClick={() => handleRemove(user)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal open={open} onClose={() => setOpen(false)} />
    </Container>
  );
};

export default AllUser;
