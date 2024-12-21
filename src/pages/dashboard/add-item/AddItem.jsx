import React from "react";
import { Controller, useForm } from "react-hook-form";
import FormField from "../../../component/FormField";
import Swal from "sweetalert2";
import useCategory from "../../../hooks/useCategory";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormLabel,
  Input,
  Textarea,
  Typography,
} from "@mui/joy";

const hosting_key = import.meta.env.VITE_img_hosting_key;

const AddItem = () => {
  const navigate = useNavigate();
  const { categories } = useCategory();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      supplier: "",
      taste: "",
      price: "",
      image: "",
      category: "",
      details: "",
    },
  });

  const item_upload_url = "http://localhost:4000/admin/api/products";
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${hosting_key}`;

  const onValid = async (data) => {
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

            baseURL.post(item_upload_url, newItem).then((data) => {
              if (data.status === 200) {
                reset();
                navigate("/dashboard/all-product");
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
    <Container maxWidth="sm" sx={{ boxShadow: 3, py: 4 }}>
      <Typography textAlign="center" level="h3" sx={{ mb: 3, color: "violet" }}>
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
        autoComplete="on"
      >
        <Box>
          <FormLabel>*Name</FormLabel>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <FormField {...field} type="text" placeholder="Product title" />}
          />
        </Box>
        <Box>
          <FormLabel>*Supplier</FormLabel>
          <Controller
            name="supplier"
            control={control}
            render={({ field }) => (
              <FormField {...field} type="text" placeholder="Product supplier" />
            )}
          />
        </Box>

        <Box>
          <FormLabel>*Taste</FormLabel>
          <Controller
            name="taste"
            control={control}
            render={({ field }) => <FormField {...field} type="text" placeholder="Product taste" />}
          />
        </Box>
        <Box>
          <FormLabel>*Price</FormLabel>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <FormField {...field} type="number" placeholder="Product price...$" />
            )}
          />
        </Box>

        <Controller
          name="category"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <Autocomplete
              options={categories}
              placeholder="Select Category"
              getOptionLabel={(option) => option?.name}
              value={categories?.find((c) => c._id === value) || null}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue._id : null);
              }}
              renderInput={(params) => <Input {...params} />}
              {...field}
            />
          )}
        />

        <Box>
          <FormLabel>*Description</FormLabel>
          <Controller
            name="details"
            control={control}
            render={({ field }) => (
              <Textarea placeholder="Product details..." minRows={2} {...field} />
            )}
          />
        </Box>

        <Box sx={{ mb: 10 }}>
          <FormLabel>*Image</FormLabel>
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
        </Box>

        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddItem;
