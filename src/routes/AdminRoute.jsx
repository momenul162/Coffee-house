import { Typography } from "@mui/joy";
import { useStoreState } from "easy-peasy";
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useStoreState((state) => state.currentUser);
  const location = useLocation();

  if (!user && loading) {
    return <Typography>Loading...</Typography>;
  }

  if (user.roles === "ADMIN") {
    return children;
  }

  return (
    <div>
      <Navigate to="/" state={{ from: location }} replace />
    </div>
  );
};

export default AdminRoute;
