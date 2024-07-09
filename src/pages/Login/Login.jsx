import { useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormField from "../../component/FormField";
import Swal from "sweetalert2";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";
import axios from "axios";
import { Box, Button, Container, Typography } from "@mui/joy";

const Login = () => {
  const { setUser } = useStoreActions((actions) => actions.currentUser);
  const [error, setError] = useState(null);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onValid = async (newUser) => {
    try {
      if (newUser.email && newUser.password) {
        const { data } = await axios.post(
          "https://nexus-coffee-house.onrender.com/auth/login",
          newUser
        );

        console.log(data?.user?.user);
        if (data.user.token) {
          localStorage.setItem("jwt-access-token", data?.user.token);
          const user = data?.user?.user;
          setUser(user);
          navigate(from, { replace: true });
          reset();
          window.location.reload();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Login Successfully`,
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ border: 1, boxShadow: 5, py: 8, px: 0, mt: 20, mb: 10, borderRadius: 10 }}
    >
      <Typography textAlign="center" level="h3" sx={{ mb: 3, color: "violet" }}>
        Sign in
      </Typography>
      <Box
        onSubmit={handleSubmit(onValid)}
        component="form"
        sx={{
          "& > :not(style)": { m: 2 },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => <FormField {...field} placeholder="Your email" type="email" />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormField {...field} placeholder="Your password" type="password" />
          )}
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
