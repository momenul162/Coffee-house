import React from "react";
import NavBar from "../shared/nav-bar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../shared/nav-bar/footer/Footer";

const AuthLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
