import { Badge } from "@mui/joy";
import { Button } from "@mui/material";
import Aos from "aos";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavItem = ({ carts, user }) => {
  const navigate = useNavigate();

  Aos.init({
    duration: 1200,
  });

  return (
    <>
      <NavLink to="#products" style={{ textDecoration: "none" }}>
        <Button sx={{ display: "block", fontSize: "1.2rem" }}>Products</Button>
      </NavLink>
      {user.roles === "ADMIN" && (
        <NavLink to="/dashboard/overview" style={{ textDecoration: "none" }}>
          <Button sx={{ display: "block", fontSize: "1.2rem" }}>Dashboard</Button>
        </NavLink>
      )}
      {user.roles !== "ADMIN" && (
        <NavLink to="#" style={{ textDecoration: "none" }}>
          <Button sx={{ display: "block", fontSize: "1.2rem" }}>Your Orders</Button>
        </NavLink>
      )}

      <Badge badgeContent={carts?.length}>
        <NavLink to="/api/carts" style={{ textDecoration: "none" }}>
          <Button sx={{ display: "block", fontSize: "1.2rem" }}>🛒</Button>
        </NavLink>
      </Badge>
    </>
  );
};

export default NavItem;
