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
import React from "react";
import { Controller, useForm } from "react-hook-form";
import FormField from "../../../component/FormField";
import axios from "axios";
import Swal from "sweetalert2";
import useCategory from "../../../hooks/useCategory";

const hosting_key = import.meta.env.VITE_img_hosting_key;

const AddItem = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      supplier: "",
      taste: "",
      price: 0,
      image: "",
      category: "",
      details: "",
    },
  });

  const categories = useCategory();
  const item_upload_url = "http://localhost:4000/admin/api/products";
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${hosting_key}`;

  const onValid = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image);

    try {
      fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            const imgURL = result.data.display_url;
            const { name, supplier, price, category, taste, details } = data;
            const newItem = { name, price, supplier, category, taste, details, image: imgURL };

            axios.post(item_upload_url, newItem).then((data) => {
              if (data.status === 200) {
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `${data.data.message}`,
                  showConfirmButton: false,
                  timer: 1000,
                });
              }
            });
          }
        });
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ boxShadow: 3, py: 8, px: 0, mt: 4, borderRadius: 2 }}>
      <Typography align="center" variant="h4" sx={{ mb: 3, color: "violet" }}>
        Add New Coffee
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
            render={({ field }) => <FormField {...field} label="Name" type="text" />}
          />
          <Controller
            name="supplier"
            control={control}
            render={({ field }) => <FormField {...field} label="Supplier" type="text" />}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Controller
            name="taste"
            control={control}
            render={({ field }) => <FormField {...field} label="Taste" type="text" />}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => <FormField {...field} label="Price" type="text" />}
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
          control={control}
          name="image"
          render={({ field: { onChange, value, ref, ...field } }) => {
            return (
              <FormField
                type="file"
                ref={ref}
                value={value?.fileName}
                onChange={(event) => onChange(event.target.files[0])}
                {...field}
              />
            );
          }}
        />
        <Controller
          name="details"
          control={control}
          render={({ field }) => <FormField {...field} label="Details" type="text" />}
        />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddItem;
