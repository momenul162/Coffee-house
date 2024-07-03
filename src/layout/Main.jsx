import React from "react";
import Home from "../pages/Home/home-index/Home";
import { Outlet } from "react-router-dom";
import Footer from "../shared/footer/Footer";

const Main = () => {
  return (
    <div>
      <Home />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
