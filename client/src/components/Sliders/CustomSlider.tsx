import { ReactNode, useState } from "react";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { Box, IconButton } from "@mui/material";

import { Swiper } from "swiper/react";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CustomSlider = ({
  children,
  height,
  width,
  top,
  left,
  right,
}: {
  children: ReactNode;
  height?: string | number;
  width?: string | number;
  top?: number;
  left?: number;
  right?: number;
}) => {
  const [swipe, setSwipe] = useState<any>({});

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "flex-start",
          textAlign: "center",
          left: left || 80,
          top: top || 0,
          width: width || 42,
          height: height || "auto",
          zIndex: 998,
        }}
      >
        <IconButton
          sx={{
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": {
              background: "#FF8C00 !important",
            },
          }}
          onClick={() => swipe.slidePrev()}
        >
          <IoIosArrowBack size={20} color="#fff" />
        </IconButton>
      </Box>
      <Swiper
        onInit={(ev) => setSwipe(ev)}
        spaceBetween={30}
        slidesPerView={"auto"}
        freeMode={true}
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
          right: right || 80,
          top: top || 0,
          width: width || 42,
          height: height || "auto",
          zIndex: 998,
        }}
      >
        <IconButton
          sx={{
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": {
              bgcolor: "#FF8C00 !important",
            },
          }}
          onClick={() => swipe.slideNext()}
        >
          <IoIosArrowForward size={20} color="#fff" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomSlider;
