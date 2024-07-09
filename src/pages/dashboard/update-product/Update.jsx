import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import FormField from "../../../component/FormField";
import Swal from "sweetalert2";
import useCategory from "../../../hooks/useCategory";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormLabel,
  Input,
  Textarea,
  TextField,
  Typography,
} from "@mui/joy";
import UpdateFormField from "../../../component/UpdateFormField";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm({});
  const { product } = useStoreState((state) => state?.product);
  const categories = useCategory();
  const { fetchProduct } = useStoreActions((actions) => actions?.product);
  const { updateProduct } = useStoreActions((actions) => actions?.products);

  useEffect(() => {
    if (id) {
      fetchProduct({ productId: id });
    }
  }, [id]);

  if (!product) {
    return;
  }

  const onValid = async (data) => {
    await updateProduct({ productId: id, newData: data, page: 1, limit: 10 });
    reset();
    navigate("/dashboard/all-product");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Product update successfully",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ boxShadow: 3, py: 8, px: 0, mt: 4, borderRadius: 2 }}>
      <Typography textAlign="center" level="h3" sx={{ mb: 3, color: "violet" }}>
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
        <Box>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <UpdateFormField {...field} defaultValue={product?.name} type="text" />
            )}
          />
        </Box>
        <Box>
          <Controller
            name="supplier"
            control={control}
            render={({ field }) => (
              <UpdateFormField {...field} defaultValue={product?.supplier} type="text" />
            )}
          />
        </Box>

        <Box>
          <Controller
            name="taste"
            control={control}
            render={({ field }) => (
              <UpdateFormField {...field} defaultValue={product?.taste} type="text" />
            )}
          />
        </Box>
        <Box>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <UpdateFormField {...field} defaultValue={product?.price} type="text" />
            )}
          />
        </Box>

        <Controller
          name="category"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <>
              <Autocomplete
                placeholder={product?.category?.name}
                defaultValue={product?.category?.name}
                options={categories}
                getOptionLabel={(option) => option?.name}
                value={categories?.find((c) => c._id === value) || null}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue._id : null);
                }}
                renderInput={(params) => <Input {...params} />}
                {...field}
              />
            </>
          )}
        />
        <Controller
          name="details"
          control={control}
          render={({ field }) => (
            <Textarea
              minRows={2}
              {...field}
              defaultValue={product?.details ?? "Details"}
              type="text"
            />
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
