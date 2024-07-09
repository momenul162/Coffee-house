// import { Box, Button, Container, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../component/FormField";
import Swal from "sweetalert2";
import axios from "axios";
import { Box, Button, Container, Typography } from "@mui/joy";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { control, handleSubmit, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onValid = async (newData) => {
    try {
      if (newData.name && newData.email && newData.password) {
        const { data } = await axios.post(
          "https://nexus-coffee-house.onrender.com/auth/register",
          newData
        );

        console.log(data);

        if (data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/auth/login");
          reset();
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ border: 1, boxShadow: 3, py: 10, px: 0, mt: 20, mb: 10, borderRadius: 10 }}
    >
      <Typography textAlign="center" level="h4" sx={{ mb: 3, color: "violet" }}>
        Sign up
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
        <Controller
          name="name"
          control={control}
          render={({ field }) => <FormField {...field} placeholder="Name" type="text" />}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => <FormField {...field} placeholder="Email" type="email" />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <FormField {...field} placeholder="Password" type="password" />}
        />
        {error && (
          <Typography variant="body2" color="danger" textAlign={"center"}>
            {error}
          </Typography>
        )}
        <Button
          variant="outlined"
          color="neutral"
          type="submit"
          sx={{ ":hover": { color: "teal", borderColor: "teal" } }}
        >
          Sign up
        </Button>
      </Box>
      <Typography textAlign="center">
        Already have an account? <Link to="/auth/login">Login</Link>
      </Typography>
    </Container>
  );
};

export default Register;
