import { Button, Tooltip } from "@mui/material";
import React from "react";

const NavButton = ({ navIcon, navTitle }) => {
  return (
    <Tooltip title={`open`}>
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
    </Tooltip>
  );
};

export default NavButton;
