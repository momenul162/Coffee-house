import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Banner.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import img from "../../../assets/Banner/img1.jpg";
import img1 from "../../../assets/Banner/img2.jpg";
import img2 from "../../../assets/Banner/img3.jpg";
import img3 from "../../../assets/Banner/img4.jpg";

const Banner = () => {
  return (
    <Swiper
      spaceBetween={50}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src={img} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3} alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
