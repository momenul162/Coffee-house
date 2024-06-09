import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DialogContent, DialogTitle, ModalDialog, Button, Box, Autocomplete } from "@mui/joy";
import { useStoreActions, useStoreState } from "easy-peasy";

const UpdateUser = () => {
  const { id } = useParams();
  const { updateUser } = useStoreActions((actions) => actions.users);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ userId: id, roles: e?.target[0]?.value });
    navigate("/dashboard/users");
  };

  const roles = [{ label: "ADMIN" }, { label: "USER" }, { label: "WAITER" }];

  return (
    <ModalDialog>
      <DialogTitle>User Role Update</DialogTitle>
      <DialogContent>Fill in the information of the project.</DialogContent>
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
      >
        <Autocomplete placeholder="Combo box" options={roles} sx={{ width: 300, my: 1 }} />

        <Button type="submit">Submit</Button>
      </Box>
    </ModalDialog>
  );
};

export default UpdateUser;
