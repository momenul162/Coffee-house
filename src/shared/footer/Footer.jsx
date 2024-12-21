import React, { useState } from "react";
import img from "../../assets/coffee-logo.png";
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { LocalPhone, LocationOn, Markunread } from "@mui/icons-material";
import FooterIcon from "../../component/footer-icons/FooterIcon";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Stack,
  Typography,
} from "@mui/joy";

const Footer = () => {
  const [data, setData] = useState({
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
    <>
      <Box
        sx={{
          bgcolor: "rgba(68,42,107, 0.82)",
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/"
              >
                <Box
                  component="img"
                  sx={{
                    height: 50,
                    display: "flex",
                    overflow: "hidden",
                  }}
                  src={img}
                  alt=""
                />
                <Typography
                  sx={{
                    display: "flex",
                    gap: 1,
                    fontWeight: "bold",

                    fontSize: { xs: "18px", sm: "25px", md: "30px", lg: "42px" },
                  }}
                >
                  <Stack sx={{ color: "#0C1844" }}>Nexus</Stack>{" "}
                  <Stack sx={{ color: "red" }}>Coffee</Stack>{" "}
                  <Stack sx={{ color: "#0C1844" }}>House</Stack>
                </Typography>
              </Link>
              <CardContent>
                <Typography sx={{ fontSize: 12, color: "white" }} gutterBottom>
                  Always ready to be your friend. Come & Contact with us to share your memorable
                  moments, to share with your best companion.
                </Typography>
                <CardActions sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
                  <FooterIcon icon={<FacebookOutlinedIcon />} />
                  <FooterIcon icon={<TwitterIcon />} />
                  <FooterIcon icon={<InstagramIcon />} />
                  <FooterIcon icon={<YouTubeIcon />} />
                  <FooterIcon icon={<GitHubIcon />} />
                </CardActions>
              </CardContent>
            </Grid>
            <Grid item xs={4} sx={{ mb: { xs: 2 } }}>
              <Typography level="h4" sx={{ color: "#0C1844", fontWeight: 700 }}>
                Get in Touch
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16, lg: 18 },
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LocalPhone /> +88 01869101010
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16, lg: 18 },
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Markunread /> cafehouse@gmail.com
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16, lg: 18 },
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LocationOn /> Binodpur, 6206, Motihar, Rajshahi
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <form onSubmit={handleSubmit} id="demo">
                  <FormControl>
                    <Typography level="h4" sx={{ color: "#0C1844", fontWeight: 700 }}>
                      Join our Coffee House
                    </Typography>

                    <Input
                      sx={{ "--Input-decoratorChildHeight": "50px" }}
                      placeholder="example@gmail.com"
                      type="email"
                      required
                      value={data.email}
                      onChange={(event) =>
                        setData({ email: event.target.value, status: "initial" })
                      }
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
            </Grid>
          </Grid>
        </Container>
        <Divider sx={{ fontWeight: "bold" }} inset="context" />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          py: 2,
          bgcolor: "#0C1844",
          color: "white",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 25,
            display: "flex",
            overflow: "hidden",
          }}
          src={img}
          alt=""
        />
        <Typography variant="body2">© Nexus Coffee House. 2024</Typography>
      </Box>
    </>
  );
};

export default Footer;
