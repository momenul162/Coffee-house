import React from "react";
import NavBar from "../../../shared/nav-bar/NavBar";
import Banner from "../slider/Banner";
import Feature from "../feature/Feature";
import Products from "../display-products/Products";
import CoffeeCard from "../coffee-feature/CoffeeCard";
import Subscribe from "../Subscription/Subscribe";
import Albums from "../coffee-album/Albums";
import { Box } from "@mui/joy";

const Home = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <NavBar />
      <Banner />
      <Feature />
      <Products />
      <CoffeeCard />
      <Subscribe />
    </Box>
  );
};

export default Home;
