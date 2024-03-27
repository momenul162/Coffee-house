import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormField from "../../../component/FormField";
const hosting_key = import.meta.env.VITE_img_hosting_key;

const AddItem = () => {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${hosting_key}`;
  //   const item_upload_url = "http://localhost:4000/api/products";

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      supplier: "",
      taste: "",
      image: "",
      category: "",
      details: "",
    },
  });

  console.log(control);

  const onValid = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    console.log(formData);

    try {
      const res = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to upload image");
      }
      const result = await res.json();
      console.log("Image uploaded successfully:", result);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   if (data.name && data.category && data.image && data.supplier) {
    //     const res = await axios.post(url, data);
    //     if (res.data.token) {
    //     }
    //   }
    // } catch (e) {
    //   console.log(e.message);
    // }
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
            name="category"
            control={control}
            render={({ field }) => <FormField {...field} label="Category" type="" />}
          />
        </Box>
        {/* <Controller
          name="image"
          control={control}
          render={({ field: onChange, ...rest }) => <FormField {...field} type="file" />}
        /> */}
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, ref, ...rest } }) => {
            return (
              <FormField
                type="file"
                ref={ref}
                onChange={(event) => onChange(event.target.files[0])}
                {...rest}
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
