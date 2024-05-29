import { Box, Button, Container, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../component/FormField";
import Swal from "sweetalert2";
import { baseURL } from "../../utils/baseURL";
import { useStoreActions } from "easy-peasy";

const Login = () => {
  const navigate = useNavigate();
  const { fetchCurrentUser } = useStoreActions((actions) => actions.currentUser);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onValid = async (data) => {
    try {
      if (data.email && data.password) {
        const res = await baseURL.post("/auth/login", data);

        if (res.data.token) {
          localStorage.setItem("jwt-access-token", res.data.token);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${res.data.message}`,
            showConfirmButton: false,
            timer: 1000,
          });
          fetchCurrentUser();
          navigate("/");
          reset();
        }
      }
    } catch (e) {
      console.log(e.message);
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
          "& > :not(style)": { m: 1, width: "50ch" },
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
