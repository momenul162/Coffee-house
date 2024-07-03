import { Favorite, ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/joy";
import Aos from "aos";
import React from "react";
import { NavLink } from "react-router-dom";
import NavButton from "./Nav-button/NavButton";

const NavItem = ({ carts, user }) => {
  Aos.init({
    duration: 1200,
  });

  return (
    <>
      <NavLink to="#products" style={{ textDecoration: "none" }}>
        <NavButton navIcon={"Products"} />
      </NavLink>
      {user.roles === "ADMIN" && (
        <NavLink to="/dashboard/overview" style={{ textDecoration: "none" }}>
          <NavButton navIcon={"Dashboard"} />
        </NavLink>
      )}
      {user.roles !== "ADMIN" && (
        <NavLink to="/api/my-orders" style={{ textDecoration: "none" }}>
          <NavButton navIcon={"My Orders"} />
        </NavLink>
      )}

      <Badge badgeContent={carts?.length}>
        <NavLink to="/api/carts" style={{ textDecoration: "none" }}>
          <NavButton navIcon={<ShoppingCart />} />
        </NavLink>
      </Badge>
      <Badge badgeContent={1}>
        <NavLink to="#" style={{ textDecoration: "none" }}>
          <NavButton navIcon={<Favorite />} />
        </NavLink>
      </Badge>
    </>
  );
};

export default NavItem;
