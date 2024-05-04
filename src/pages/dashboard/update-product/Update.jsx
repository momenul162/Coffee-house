import React from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormField from "../../../component/FormField";
import Swal from "sweetalert2";
import useCategory from "../../../hooks/useCategory";
import { baseURL } from "../../../utils/baseURL";

const Update = () => {
  const { id } = useParams();
  const categories = useCategory();
  const { control, handleSubmit, reset } = useForm({});

  // const product = products?.find((item) => item._id === id);

  const onValid = async (data) => {
    baseURL.patch(`/admin/api/products/${id}`, data).then((data) => {
      if (data.status === 200) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product update successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <Container maxWidth="sm" sx={{ boxShadow: 3, py: 8, px: 0, mt: 4, borderRadius: 2 }}>
      <Typography align="center" variant="h4" sx={{ mb: 3, color: "violet" }}>
        Update Coffee
      </Typography>
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
        <Box sx={{ display: "flex" }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormField {...field} defaultValue={product?.name ?? "Name"} type="text" />
            )}
          />
          <Controller
            name="supplier"
            control={control}
            render={({ field }) => (
              <FormField {...field} defaultValue={product?.supplier ?? "Supplieer"} type="text" />
            )}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Controller
            name="taste"
            control={control}
            render={({ field }) => (
              <FormField {...field} defaultValue={product?.taste ?? "Taste"} type="text" />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <FormField {...field} defaultValue={product?.price ?? "Price"} type="text" />
            )}
          />
        </Box>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <FormControl sx={{ minWidth: 210 }} size="small">
              <InputLabel id="demo-select-small-label">Category</InputLabel>

              <Select
                {...field}
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Category"
              >
                <MenuItem value="">
                  <em>Select one</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="details"
          control={control}
          render={({ field }) => (
            <FormField {...field} defaultValue={product?.details ?? "Details"} type="text" />
          )}
        />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Update;
