import { Box, Button, Container, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../component/FormField";
import Swal from "sweetalert2";
import { baseURL } from "../../utils/baseURL";

const Register = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onValid = async (data) => {
    try {
      if (data.name && data.email && data.password) {
        const res = await baseURL.post("/auth/register", data);
        if (res.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${res.data.message}`,
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/auth/login");
          reset();
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ boxShadow: 3, py: 10, px: 0, mt: 20, mb: 10, borderRadius: 2 }}>
      <Typography align="center" variant="h4" sx={{ mb: 3, color: "violet" }}>
        Sign up
      </Typography>
      <Box
        onSubmit={handleSubmit(onValid)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <FormField {...field} label="Name" type="text" />}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => <FormField {...field} label="Email" type="email" />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <FormField {...field} label="Password" type="password" />}
        />
        <Button variant="outlined" type="submit">
          Sign up
        </Button>
      </Box>
      <Typography align="center">
        Already have an account? <Link to="/auth/login">Login</Link>
      </Typography>
    </Container>
  );
};

export default Register;
