import { Button } from "@mui/joy";
import React from "react";

const NavButton = ({ navIcon }) => {
  return (
    <Button
      sx={{
        display: "block",
        fontSize: "1.1rem",
        color: "#071952",
        bgcolor: "transparent",
        ":hover": { bgcolor: "#EEEDEB", color: "#304463" },
      }}
    >
      {navIcon}
    </Button>
  );
};

export default NavButton;
