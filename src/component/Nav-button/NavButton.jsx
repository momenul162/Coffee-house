import { Button } from "@mui/joy";
import React from "react";

const NavButton = ({ navIcon }) => {
  return (
    <Button sx={{ display: "block", fontSize: "1.2rem", color: "white", bgcolor: "transparent" }}>
      {navIcon}
    </Button>
  );
};

export default NavButton;
