import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Stack, Typography } from "@mui/material";
import "swiper/swiper-bundle.css";

import { BannerType } from "../../types";

SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

const Banner = ({ bannerData }: { bannerData: BannerType[] }) => {
  return (
    <>
      <Swiper
        spaceBetween={0}
        pagination={{ clickable: true }}
        centeredSlides={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={false}
      >
        {bannerData.map((slide, indx) => {
          const {
            attributes: {
              heading,
              description,
              cover: {
                data: {
                  attributes: { url },
                },
              },
            },
          } = slide;

          return (
            <SwiperSlide key={indx} style={{ height: "100%", width: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  maxHeight: 550,
                }}
              >
                <Box
                  component="img"
                  width="100%"
                  height="100%"
                  // borderRadius={10}
                  src={`${process.env.REACT_APP_BASE_URL}${url}`}
                  alt={heading}
                />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;
