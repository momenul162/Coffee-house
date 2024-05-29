import React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Box } from "@mui/joy";

const Subscribe = () => {
  const [data, setData] = React.useState({
    email: "",
    status: "initial",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: "loading" }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ email: "", status: "sent" });
      }, 1500);
    } catch (error) {
      setData((current) => ({ ...current, status: "failure" }));
    }
  };

  return (
    <Box sx={{ mt: 10, position: "absolute", bottom: -310, left: "15%", right: "15%" }}>
      <form onSubmit={handleSubmit} id="demo">
        <FormControl
          sx={{
            maxWidth: { xs: "90%", sm: "40%", md: "55%" },
            px: { xs: 2, md: 16 },
            py: { xs: 1, md: 10 },
            mx: "auto",
            bgcolor: "rgba(37,20,100, 0.60)",
            borderRadius: "15px 15px 0 0",
            WebKitCSSMatrix: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
            MozBoxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
            boxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
          }}
        >
          <FormLabel
            sx={(theme) => ({
              color: "white",
              fontSize: "1.2rem",
              "--FormLabel-color": theme.vars.palette.primary.plainColor,
            })}
          >
            Join our Coffee House
          </FormLabel>
          <Input
            sx={{ "--Input-decoratorChildHeight": "45px" }}
            placeholder="example@gmail.com"
            type="email"
            required
            value={data.email}
            onChange={(event) => setData({ email: event.target.value, status: "initial" })}
            error={data.status === "failure"}
            endDecorator={
              <Button
                variant="solid"
                color="primary"
                loading={data.status === "loading"}
                type="submit"
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                Subscribe
              </Button>
            }
          />
          {data.status === "failure" && (
            <FormHelperText sx={(theme) => ({ color: theme.vars.palette.danger[400] })}>
              Oops! something went wrong, please try again later.
            </FormHelperText>
          )}

          {data.status === "sent" && (
            <FormHelperText sx={(theme) => ({ color: theme.vars.palette.primary[400] })}>
              Thank you for your Subscription!
            </FormHelperText>
          )}
        </FormControl>
      </form>
    </Box>
  );
};

export default Subscribe;
