import { ReactNode, useState } from "react";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { Box, IconButton } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, {
  Lazy,
  Navigation,
  Thumbs,
  Pagination,
  Controller,
} from "swiper/core";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const CategorySlider = ({ children }: { children: ReactNode }) => {
  const [swipe, setSwipe] = useState<any>({});

  return (
    <Box>
      <Swiper
        onInit={(ev) => setSwipe(ev)}
        spaceBetween={30}
        slidesPerView={"auto"}
        // centeredSlides={true}
        loop={true}
        // style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        {children}
      </Swiper>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          top: 0,
          right: 80,
          zIndex: 999,
          width: 42,
          height: 166,
          bgcolor: "#ffffff",
        }}
      >
        <IconButton
          sx={{
            border: "1px solid #FF8C00",
            "&:hover": {
              background: "transparent !important",
            },
          }}
          onClick={() => swipe.slideNext()}
        >
          <HiArrowLongRight size={20} color="#FF8C00" />
        </IconButton>
      </Box>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          top: 0,
          left: 80,
          zIndex: 999,
          width: 42,
          height: 166,
          bgcolor: "#ffffff",
        }}
      >
        <IconButton
          sx={{
            border: "1px solid #FF8C00",
            "&:hover": {
              background: "transparent !important",
            },
          }}
          onClick={() => swipe.slidePrev()}
        >
          <HiArrowLongLeft size={20} color="#FF8C00" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CategorySlider;
