import img from "../../../assets/coffee-shop.jpg";
import Box from "@mui/material/Box";

const Banner = () => {
  return (
    <Box>
      <Box
        component="img"
        sx={{
          height: 600,
          display: "block",
          overflow: "hidden",
          width: "100%",
        }}
        src={img}
        alt=""
      />
    </Box>
  );
};

export default Banner;
