import { useRef, useState, useLayoutEffect } from "react";

import { Box, IconButton, Stack } from "@mui/material";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, {
  Navigation,
  Thumbs,
  Pagination,
  Controller,
  Lazy,
} from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { ProductType } from "../../types";
SwiperCore.use([Controller, Thumbs, Pagination, Navigation, Lazy]);

type variantsType = ProductType["attributes"]["variants"];

export default function ProductImageSlider({
  selectedVariant,
  name,
}: {
  selectedVariant: variantsType[0];
  name: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [firstSwiper, setFirstSwiper] = useState<SwiperCore[]>([]);
  const [secondSwiper, setSecondSwiper] = useState<SwiperCore[]>([]);
  const swiper1Ref = useRef<SwiperCore | null>(null);
  const swiper2Ref = useRef<SwiperCore | null>(null);

  useLayoutEffect(() => {
    if (swiper1Ref.current && swiper2Ref.current) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  const [swipe, setSwipe] = useState<any>({});

  const productImages = (variants: variantsType) => {
    const modifyVariants = variants.map((variant, indx) => ({
      id: indx + 1,
      ...variant,
    }));

    return modifyVariants;
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 100,
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="center">
        <Box sx={{ height: "100%", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "bottom",
              top: -45,
              left: 18,
              zIndex: 999,
              width: 42,
              height: "auto",
            }}
          >
            <IconButton
              sx={{
                "&:hover": {
                  background: "transparent !important",
                },
              }}
              onClick={() => swipe.slidePrev()}
            >
              <IoIosArrowUp size={25} color="#FF8C00" />
            </IconButton>
          </Box>
          <Swiper
            onInit={(ev) => setSwipe(ev)}
            loop={false}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            touchRatio={0.2}
            direction="vertical"
            slideToClickedSlide={true}
            onSwiper={setThumbsSwiper}
            controller={{ control: firstSwiper }}
            style={{ width: "max-content" }}
          >
            {selectedVariant!.images.map((image, indx) => (
              <SwiperSlide key={indx}>
                <Box
                  component="img"
                  src={image}
                  sx={{
                    width: "100%",
                    maxWidth: 70,
                    height: "auto",
                    borderRadius: 1,
                    border: "1px solid #e1e1e1",
                    px: 0.2,
                    py: 0.8,
                    mb: 0.2,
                  }}
                  alt={`${name}-${selectedVariant!.colorName}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              bottom: -30,
              left: 14,
              zIndex: 999,
              width: 42,
              height: "auto",
              bgcolor: "#ffffff",
            }}
          >
            <IconButton
              sx={{
                "&:hover": {
                  background: "transparent !important",
                },
              }}
              onClick={() => swipe.slideNext()}
            >
              <IoIosArrowDown size={25} color="#FF8C00" />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            minHeight: 328,
            maxHeight: "max-content",
            width: "100%",
          }}
        >
          <Swiper
            onSwiper={(swiper) => {
              if (swiper1Ref.current !== null) {
                swiper1Ref.current = swiper;
              }
            }}
            watchSlidesVisibility={true}
            lazy={true}
            preloadImages={false}
            controller={{ control: secondSwiper }}
            // spaceBetween={40}
            slidesPerView={1}
            centeredSlides={true}
            thumbs={{ swiper: thumbsSwiper }}
            style={{ width: "100%", height: "100%" }}
          >
            {selectedVariant!.images.map((image, indx) => (
              <SwiperSlide key={indx}>
                {/* <Box
                  sx={{
                    width: "100%",
                    height: "max-content",
                    minHeight: 380,
                    position: "relative",
                  }}
                > */}
                <Box
                  className="swiper-lazy"
                  component="img"
                  src={image}
                  data-src={image}
                  sx={{
                    // position: "absolute",
                    // top: 0,
                    // left: 0,
                    // right: 0,
                    // bottom: 0,
                    width: "100%",
                    // height: "100%",
                    m: "0 auto",
                    objectFit: "contain",
                  }}
                  alt={`${name}-${selectedVariant!.colorName}`}
                />
                <Box className="swiper-lazy-preloader">
                  <Box component="span"></Box>
                </Box>
                {/* </Box> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Stack>
    </Box>
  );
}
