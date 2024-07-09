import { Typography } from "@mui/joy";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthenticateRoute = ({ children }) => {
  const { user, loading } = useStoreState((state) => state.currentUser);
  const { fetchCurrentUser } = useStoreActions((actions) => actions.currentUser);
  const location = useLocation();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (loading) {
    return (
      <Typography textAlign={"center"} fontSize={25}>
        Loading...
      </Typography>
    );
  }

  if (user) {
    return children;
  }

  return (
    <div>
      <Navigate to="/auth/login" state={{ from: location }} replace />
    </div>
  );
};

export default AuthenticateRoute;
