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
        pagination={true}
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
            <SwiperSlide key={indx} style={{ height: "100%" }}>
              <Box bgcolor="#daf3ff" sx={{ width: "100%", height: "100%" }}>
                <Box m="0 auto" px={20} py={5}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                  >
                    <Box maxWidth={{ xs: "100%", md: 520 }}>
                      <Typography
                        lineHeight="1em"
                        fontSize={40}
                        fontWeight={900}
                        pb={2}
                      >
                        {heading}
                      </Typography>
                      <Typography fontSize={26} variant="body2">
                        {description}
                      </Typography>
                    </Box>
                    <Box>
                      <img
                        width="350px"
                        height="350px"
                        style={{ objectFit: "cover" }}
                        src={`${process.env.REACT_APP_BASE_URL}${url}`}
                        alt={heading}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;
