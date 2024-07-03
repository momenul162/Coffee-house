import { Box, Button, Container, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../component/FormField";
import Swal from "sweetalert2";
import { baseURL } from "../../utils/baseURL";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useStoreActions((actions) => actions.currentUser);
  const [error, setError] = useState(null);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onValid = async (newUser) => {
    try {
      if (newUser.email && newUser.password) {
        const { data } = await axios.post("http://localhost:4000/auth/login", newUser);

        if (data.user.token) {
          localStorage.setItem("jwt-access-token", data?.user.token);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Login Successfully`,
            showConfirmButton: false,
            timer: 1000,
          });
          setUser(data?.user?.user);
          reset();
          navigate("/");
          window.location.reload();
        }
      }
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ boxShadow: 3, py: 8, px: 0, mt: 20, mb: 10, borderRadius: 2 }}>
      <Typography align="center" variant="h4" sx={{ mb: 3, color: "violet" }}>
        Sign in
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
          name="email"
          control={control}
          render={({ field }) => <FormField {...field} label="Email" type="email" />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <FormField {...field} label="Password" type="password" />}
        />
        {error && (
          <Typography variant="body2" color="red">
            {error}
          </Typography>
        )}
        <Button variant="outlined" type="submit">
          Login
        </Button>
      </Box>
      <Typography align="center">
        New to here? <Link to="/auth/register">Sign up</Link>
      </Typography>
    </Container>
  );
};

export default Login;
