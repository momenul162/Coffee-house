import React from "react";
import NavBar from "../shared/nav-bar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../shared/footer/Footer";

const CartLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default CartLayout;
