import React from "react";
import NavBar from "../../../shared/nav-bar/NavBar";
import Banner from "../slider/Banner";
import Feature from "../feature/Feature";
import Products from "../display-products/Products";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Banner />
      <Feature />
      <Products />
    </div>
  );
};

export default Home;
