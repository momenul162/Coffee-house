import { Alert, Box, Button, Container, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../component/FormField";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const url = "http://localhost:4000/auth/login";

  const onValid = async (data) => {
    try {
      if (data.email && data.password) {
        const res = await axios.post(url, data);
        if (res.data.token) {
          <Alert variant="filled" severity="success">
            {res.data.message}
          </Alert>;
          navigate("/");
          reset();
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ boxShadow: 3, py: 8, px: 0, mt: 4, borderRadius: 2 }}>
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
          name="name"
          control={control}
          render={({ field }) => <FormField {...field} label="Email" type="email" />}
        />
        <Controller
          name="supplier"
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
