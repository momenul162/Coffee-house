import {
  Box,
  CardActions,
  CardContent,
  Grid,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import img from "../../../assets/coffee-logo.png";
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "rgba(68,42,107, 0.82)",
        pt: 3,
        borderStartStartRadius: { xs: 64, sm: 128, md: 256 },
        borderTopRightRadius: { xs: 64, sm: 128, md: 256 },
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6}>
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
              <Typography variant="h5">Coffee House</Typography>
            </Link>
            <CardContent>
              <Typography sx={{ fontSize: 12 }} color="white" gutterBottom>
                Always ready to be your friend. Come & Contact with us to share your memorable
                moments, to share with your best companion.
              </Typography>
              <CardActions disableSpacing>
                <IconButton aria-label="share">
                  <FacebookOutlinedIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <InstagramIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <YouTubeIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <GitHubIcon />
                </IconButton>
              </CardActions>
            </CardContent>
          </Grid>
          <Grid item xs={6}>
            <Typography>Contact us</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
