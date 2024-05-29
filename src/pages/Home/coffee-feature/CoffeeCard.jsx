import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import img from "../../../assets/coffees/coffee-card.jpg";
import { Box } from "@mui/joy";
import { Link } from "react-router-dom";

const CoffeeCard = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10, mb: 36 }}>
      <Card
        size="lg"
        orientation="horizontal"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 16,
          maxWidth: "100%",
          width: 1200,
          border: "none",
        }}
      >
        <CardOverflow>
          <img
            style={{
              marginLeft: "20px",
              maxWidth: "100%",
              borderRadius: "20px",
              WebKitCSSMatrix: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
              MozBoxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
              boxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
            }}
            alt=""
            src={img}
          />
        </CardOverflow>
        <CardContent sx={{ gap: 1.5, minWidth: "50%" }}>
          <CardContent>
            <Typography level="title-lg">Why Our Coffee is Special?</Typography>
            <Typography fontSize="sm" sx={{ mt: 0.5 }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam illum recusandae
              assumenda vel ipsa. Beatae laudantium officia sunt magnam itaque tenetur quae amet
              enim ab doloribus. Quos iste aperiam dolorem inventore accusamus tempora quidem eum
              fugiat, nobis similique non provident nesciunt magnam, excepturi natus vitae nemo quod
              et corporis error!
            </Typography>
          </CardContent>
          <Link target="_blank" to="https://en.wikipedia.org/wiki/Coffee">
            <Button
              variant="outlined"
              color="primary"
              sx={{
                "--variant-borderWidth": "2px",
                borderRadius: 40,
                borderColor: "primary.500",
                mx: "auto",
              }}
            >
              Read more
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CoffeeCard;
