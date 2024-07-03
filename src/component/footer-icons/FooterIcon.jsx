import { IconButton } from "@mui/joy";
import React from "react";

const FooterIcon = ({ icon }) => {
  return (
    <IconButton aria-label="share" sx={{ color: "white", bgcolor: "rgba(68,42,107, 0.82)" }}>
      {icon}
    </IconButton>
  );
};

export default FooterIcon;
