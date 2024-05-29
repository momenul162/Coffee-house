import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ onClick, nav, route, color }) => {
  return (
    <NavLink to={route} style={{ textDecoration: "none" }}>
      <Button onClick={onClick} sx={{ color: { color }, display: "block", fontSize: "1.2rem" }}>
        {nav}
      </Button>
    </NavLink>
  );
};

export default NavItem;
