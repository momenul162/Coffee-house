import { Box, Grid, Typography } from "@mui/material";

const FeatureCoffee = ({ img, title, body }) => {
  return (
    <Grid
      sx={{
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.2)",
          backgroundColor: "rgba(37,20,100, 0.60)",
          color: "white",
          borderRadius: 2,
        },
        cursor: "pointer",
      }}
      item
      lg={3}
      md={6}
      xs={6}
      bgcolor="whitesmoke"
      pb={2}
    >
      <Box
        component="img"
        sx={{
          height: 50,
          display: "flex",
          overflow: "hidden",
          mb: 2,
        }}
        src={img}
        alt=""
      />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{body}</Typography>
    </Grid>
  );
};

export default FeatureCoffee;
