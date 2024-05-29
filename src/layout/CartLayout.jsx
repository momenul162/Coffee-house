import React from "react";
import NavBar from "../shared/nav-bar/NavBar";
import Carts from "../pages/Carts/Carts";
import Footer from "../shared/nav-bar/footer/Footer";
import { Container } from "@mui/joy";

const CartLayout = () => {
  return (
    <div>
      <NavBar />
      <Carts />
      <Footer />
    </div>
  );
};

export default CartLayout;
