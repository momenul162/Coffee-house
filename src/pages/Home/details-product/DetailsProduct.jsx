import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useStoreActions, useStoreState } from "easy-peasy";
import Aos from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ProductReview.css";
import { Pagination, Navigation } from "swiper/modules";
import { Box, Button, CircularProgress, Container, Stack, Typography } from "@mui/joy";
import Swal from "sweetalert2";
import { Divider, Rating } from "@mui/material";
import ProductDetailsCardSkeleton from "../../../component/skeleton/CardDetailsSkeleton";

const DetailsProduct = () => {
  const { id } = useParams();
  const { product, loading } = useStoreState((state) => state.product);
  const { fetchProduct } = useStoreActions((actions) => actions.product);
  const { fetchReview } = useStoreActions((actions) => actions.reviews);
  const { reviews } = useStoreState((state) => state.reviews);
  const { user } = useStoreState((state) => state.currentUser);
  const { postCart } = useStoreActions((actions) => actions.carts);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct({ productId: id });
    fetchReview({ productId: id });
  }, [id]);

  const handleCart = (id) => {
    if (!user?.email) {
      navigate("/auth/login");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "আগে লগিন করুন",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const cartItem = { userId: user._id, itemId: id };
      postCart(cartItem);
    }
  };

  Aos.init({
    duration: 1200,
  });

  return (
    <Container maxWidth="lg" sx={{ px: 1, pt: 8 }}>
      {loading ? (
        <ProductDetailsCardSkeleton />
      ) : (
        <Box
          sx={{
            backgroundColor: "#F4F3F0",
            my: { xs: 6, md: 10 },
            py: 4,
            px: { xs: 1, md: 6, lg: 10 },
          }}
        >
          <Link to="/">
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                "&:hover": { color: "Highlight" },
              }}
            >
              <KeyboardBackspaceIcon /> Back to Home
            </Typography>
          </Link>
          <Box
            sx={{
              display: { md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              gap: { md: 4 },
            }}
          >
            <Box data-aos="fade-right">
              <img height={455} width={355} src={product?.image} alt="" />
            </Box>
            <Divider />
            <Box data-aos="fade-left" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography level="body-lg" sx={{ display: "flex", gap: 1 }}>
                Name: <Stack sx={{ fontWeight: 600, color: "#0C1844" }}>{product?.name}</Stack>
              </Typography>

              <Typography level="body-lg" sx={{ display: "flex", gap: 1 }}>
                Supplier:{" "}
                <Stack sx={{ fontWeight: 600, color: "#0C1844" }}>{product?.supplier}</Stack>
              </Typography>

              <Typography level="body-lg" sx={{ display: "flex", gap: 1 }}>
                Taste: <Stack sx={{ fontWeight: 600, color: "#0C1844" }}>{product?.taste}</Stack>
              </Typography>

              <Typography level="body-lg" sx={{ display: "flex", gap: 1 }}>
                Category:{" "}
                <Stack sx={{ fontWeight: 600, color: "#0C1844" }}>{product?.category?.name}</Stack>
              </Typography>

              <Typography level="body-lg" sx={{ display: "flex", gap: 1 }}>
                Price: <Stack sx={{ fontWeight: 600, color: "#0C1844" }}>${product?.price}</Stack>
              </Typography>

              <Typography level="body-lg" sx={{ display: "flex", gap: 1 }}>
                Details:{" "}
                <Stack sx={{ fontWeight: 500, color: "#0C1844" }}>{product?.details}</Stack>
              </Typography>
              <Button
                variant="outlined"
                onClick={() => handleCart(item._id)}
                sx={{
                  color: "rgba(68,42,107, 0.96)",
                  ":hover": { color: "rgba(68,42,107, 0.96)" },
                }}
                size="lg"
              >
                Add to cart
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Box sx={{ bgcolor: "#F4F3F0", pt: 2, pl: 2 }}>
        <Typography level="h3" sx={{ color: "#0C1844", mb: 4 }}>
          Our Customers Reviews
        </Typography>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          style={{
            maxWidth: "70%",
            paddingBottom: "15px",
            borderRadius: "5px",
            WebKitCSSMatrix: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
            MozBoxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
            boxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.20)",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews &&
            reviews?.map((review) => (
              <SwiperSlide
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15xp",
                  padding: "10px 0 20px 0",
                }}
              >
                <Typography level="h4">
                  {review.productId.name}{" "}
                  <Rating
                    sx={{ fontSize: 16, bgcolor: "#F4F3F3", p: 1 }}
                    name="half-rating"
                    value={review?.ratings}
                    precision={0.5}
                    readOnly
                  />
                </Typography>
                <Typography level="body-xs">{review.userId.name}</Typography>
                <Typography level="body-sm">"~ {review.review} ~"</Typography>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default DetailsProduct;
