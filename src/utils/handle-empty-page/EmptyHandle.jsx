import { Box, Card, Typography } from "@mui/joy";
import React from "react";

const EmptyPageHandle = ({ message }) => {
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
          <Typography fontSize={25} fontWeight={700}>
            Empty Page: 204
          </Typography>
          <Typography level="body-lg">{message}</Typography>
        </Card>
      </Box>
    </div>
  );
};

export default EmptyPageHandle;
