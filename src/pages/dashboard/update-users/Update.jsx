import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  DialogContent,
  DialogTitle,
  ModalDialog,
  Button,
  Option,
  Box,
  FormControl,
  MenuItem,
  Select,
} from "@mui/joy";
import { Controller, useForm } from "react-hook-form";
import { InputLabel } from "@mui/material";

const UpdateUser = () => {
  const { id } = useParams();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      roles: "",
    },
  });

  // const handleChange = (event) => {
  //   setRole(event.target.value);
  // };

  const onValid = (data) => {
    console.log("Selected pet:", data);
  };

  return (
    <ModalDialog>
      <DialogTitle>User Role Update</DialogTitle>
      <DialogContent>Fill in the information of the project.</DialogContent>
      <Box
        onSubmit={handleSubmit(onValid)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <Controller
          name="roles"
          control={control}
          render={({ field }) => (
            <FormControl sx={{ minWidth: 210 }} size="small">
              <InputLabel id="demo-select-small-label">Select Role</InputLabel>

              <Select
                {...field}
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Roles"
              >
                <MenuItem value="">
                  <em>Select one</em>
                </MenuItem>
                {["ADMIN", "USER"].map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Button type="submit">Submit</Button>
      </Box>
    </ModalDialog>
  );
};

export default UpdateUser;
