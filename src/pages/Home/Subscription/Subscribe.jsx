import React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Box } from "@mui/joy";
import Aos from "aos";

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

  Aos.init({
    duration: 1200,
  });

  return (
    <Box
      data-aos="fade-down"
      sx={{
        position: "absolute",
        bottom: -198,
        left: { xs: "10%", sm: "15%", md: "20%", lg: "25%" },
        right: { xs: "10%", sm: "15%", md: "20%", lg: "25%" },
      }}
    >
      <form onSubmit={handleSubmit} id="demo">
        <FormControl
          sx={{
            maxWidth: { xs: "100%", sm: "100%", lg: "100%" },
            px: { xs: 1, sm: 4, md: 8, lg: 10 },
            py: { xs: 2, sm: 3, md: 4, lg: 6 },
            mx: "auto",
            bgcolor: "rgba(37,20,100, 0.60)",
            borderRadius: "15px 15px 0 0",
            WebKitCSSMatrix: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
            MozBoxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
            boxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.20)",
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
            sx={{ "--Input-decoratorChildHeight": "50px" }}
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
            <FormHelperText sx={(theme) => ({ color: theme.vars.palette.success[200] })}>
              Thank you for your Subscription!
            </FormHelperText>
          )}
        </FormControl>
      </form>
    </Box>
  );
};

export default Subscribe;
