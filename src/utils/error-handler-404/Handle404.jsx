import { Box, Card, Typography } from "@mui/joy";
import React from "react";
import { useRouteError } from "react-router-dom";

const Handle404 = () => {
  const error = useRouteError();
  return (
    <div>
      <Box sx={{ display: "flex", mt: 10, justifyContent: "center" }}>
        <Card
          sx={{
            textAlign: "center",
            width: 400,
            maxWidth: "100%",
          }}
        >
          <Typography fontSize={40} fontWeight={700}>
            Oops!
          </Typography>
          <Typography level="body-lg">Sorry, an unexpected error has occurred.</Typography>
          <Typography level="body-lg">{error.statusText || error.message}</Typography>
        </Card>
      </Box>
    </div>
  );
};

export default Handle404;
