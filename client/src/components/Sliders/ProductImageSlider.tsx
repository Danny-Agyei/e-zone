import { useRef, useState, useLayoutEffect } from "react";

import { Box, IconButton, Stack } from "@mui/material";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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

  const handleTouchEnd = (
    swiper: any,
    event: TouchEvent | MouseEvent | PointerEvent
  ) => {
    let range = 5;
    let diff = swiper.isHorizontal()
      ? (swiper.touches.currentX as number) - (swiper.touches.startX as number)
      : (swiper.touches.currentY as number) - (swiper.touches.startY as number);

    if (diff < range || diff > -range) {
      swiper.allowClick = true;
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 200,
      }}
    >
      <Stack direction="row" spacing={5} justifyContent="center">
        <Box sx={{ height: "100%", position: "relative" }}>
          <Swiper
            loop={false}
            spaceBetween={10}
            slidesPerView={"auto"}
            threshold={5}
            on={{ touchEnd: handleTouchEnd }}
            touchRatio={0.2}
            direction="vertical"
            slideToClickedSlide={false}
            onSwiper={setThumbsSwiper}
            controller={{ control: firstSwiper }}
            // preloadImages={false}
            style={{ maxHeight: 360, overflow: "hidden" }}
          >
            {selectedVariant!.images.map((image, indx) => (
              <SwiperSlide key={indx} className="product-thumb-slider">
                <Box
                  className="thumb"
                  sx={{
                    minHeight: " 78px",
                    maxHeight: " 78px",
                    maxWidth: " 78px",
                    minWidth: " 78px",
                    m: "4px auto 5px",
                    p: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "solid 1px #eee",
                    borderRadius: " 6px",
                  }}
                >
                  <Box
                    className="thumb-img"
                    component="img"
                    src={image}
                    sx={{
                      width: "100%",
                      maxWidth: 60,
                      height: "100",
                      maxHeight: 60,
                    }}
                    alt={`${name}-${selectedVariant!.colorName}`}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box
          sx={{
            position: "relative",
            minHeight: 328,
            width: "100%",
            m: "0 auto",
          }}
        >
          <Swiper
            onSwiper={(swiper) => {
              swiper.update();
              if (swiper1Ref.current !== null) {
                swiper1Ref.current = swiper;
              }
            }}
            onInit={(ev) => setSwipe(ev)}
            freeMode={false}
            threshold={5}
            on={{ touchEnd: handleTouchEnd }}
            watchSlidesVisibility={true}
            watchSlidesProgress={true}
            observer={true}
            observeParents={true}
            preloadImages={false}
            lazy={true}
            controller={{ control: secondSwiper }}
            spaceBetween={0}
            slidesPerView={"auto"}
            centeredSlides={true}
            thumbs={{ swiper: thumbsSwiper }}
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          >
            {selectedVariant!.images.map((image, indx) => (
              <SwiperSlide key={indx}>
                <Box
                  sx={{
                    width: "100%",
                    height: 400,
                    minHeight: 400,
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    className="swiper-lazy"
                    component="img"
                    src={image}
                    data-src={image}
                    sx={{
                      // position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: "100%",
                      height: "100%",
                      minHeight: 400,
                      maxHeight: 400,
                      objectFit: "contain",
                    }}
                    alt={`${name}-${selectedVariant!.colorName}`}
                  />
                  <Box className="swiper-lazy-preloader">
                    <Box component="span"></Box>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              borderRadius: 9999,
              top: 0,
              left: 0,
              bottom: 0,
              zIndex: 999999,
              width: 42,
              height: "auto",
            }}
          >
            <IconButton
              sx={{
                bgcolor: "#fff",
                border: "1px solid #e0e0e0",
                "&:hover": {
                  width: 42,
                  height: 42,
                  bgcolor: "#f9f9f9",
                },
              }}
              onClick={() => swipe.slidePrev()}
            >
              <IoIosArrowBack size={25} color="#1c1b1b" />
            </IconButton>
          </Box>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              borderRadius: 9999,
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 999999,
              width: 42,
              height: "auto",
            }}
          >
            <IconButton
              sx={{
                bgcolor: "#fff",
                border: "1px solid #e0e0e0",
                "&:hover": {
                  width: 42,
                  height: 42,
                  bgcolor: "#f9f9f9",
                },
              }}
              onClick={() => swipe.slideNext()}
            >
              <IoIosArrowForward size={25} color="#1c1b1b" />
            </IconButton>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
