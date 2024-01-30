import { ReactNode, useState } from "react";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { Box, IconButton } from "@mui/material";

import SwiperCore, { Navigation, Scrollbar } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Scrollbar]);

const CategorySlider = ({ children }: { children: ReactNode }) => {
  const [swipe, setSwipe] = useState<any>({});

  return (
    <Box>
      <Swiper
        onInit={(ev) => setSwipe(ev)}
        spaceBetween={30}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        {children}
      </Swiper>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          top: 63,
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
          top: 63,
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
