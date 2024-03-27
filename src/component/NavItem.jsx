import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ onClick, nav, route, color }) => {
  return (
    <NavLink to={route}>
      <Button onClick={onClick} sx={{ my: 2, color: { color }, display: "block" }}>
        {nav}
      </Button>
    </NavLink>
  );
};

export default NavItem;
