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
      {user?.roles === "ADMIN" && (
        <NavLink to="/dashboard/overview" style={{ textDecoration: "none" }}>
          <NavButton navIcon={"Dashboard"} title={"Dashboard"} />
        </NavLink>
      )}
      {user?.roles !== "ADMIN" && (
        <>
          <NavLink to="/my-orders" style={{ textDecoration: "none" }}>
            <NavButton navIcon={"My Orders"} title={"My order"} />
          </NavLink>

          <NavLink to="/carts" style={{ textDecoration: "none" }}>
            <Badge badgeContent={carts?.length} color="#071952">
              <NavButton navIcon={<ShoppingCart />} title={"Carts"} />
            </Badge>
          </NavLink>
        </>
      )}
      <NavLink to="#" style={{ textDecoration: "none" }}>
        <Badge badgeContent={""} color="#071952">
          <NavButton navIcon={<Favorite />} />
        </Badge>
      </NavLink>
      {!user && (
        <>
          <NavLink to="/auth/login" style={{ textDecoration: "none" }}>
            <NavButton navIcon={"Sign in"} />
          </NavLink>
        </>
      )}
    </>
  );
};

export default NavItem;
