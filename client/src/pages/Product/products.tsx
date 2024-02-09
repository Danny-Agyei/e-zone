import React, { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SwiperClass from "swiper/types/swiper-class";
import SwiperCore, { FreeMode, Navigation, Thumbs, Controller } from "swiper";
import { Box, Grid, Stack } from "@mui/material";
import { Suspense } from "react";

import { Await, useLoaderData } from "react-router-dom";
import { ProductType } from "../../types";

type variantsType = ProductType["attributes"]["variants"];

export default function AdSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  const [firstSwiper, setFirstSwiper] = useState<SwiperClass>();
  const [secondSwiper, setSecondSwiper] = useState<SwiperClass>();
  const swiper1Ref = useRef<any>(null);
  const swiper2Ref = useRef();

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  // @custom
  const loadedData = useLoaderData() as {
    data: Promise<{
      data: Promise<any>;
    }>;
  };

  const [currentVariantId, setCurrentVariantId] = useState(1);

  //@ Product images modify
  const productImages = (variants: variantsType) => {
    const modifyVariants = variants.map((variant, indx) => ({
      id: indx + 1,
      ...variant,
    }));

    // console.log(modifyVariants);

    return modifyVariants;
  };

  // @ select product by color
  const [currentColorVariant, setCurrentColorVariant] =
    useState<variantsType[0]>();

  return (
    <Suspense fallback={<p>loading Product...</p>}>
      <Await
        resolve={loadedData!.data}
        errorElement={<h1>Error loading Product data...</h1>}
      >
        {(resolveData) => {
          const { product }: { product: ProductType } = resolveData;
          const {
            attributes: {
              name,
              price,
              features,
              categories,
              inStock,
              variants,
            },
          } = product;

          // @Get available product Color
          const availableColorVariants = variants.map((variant) =>
            variant.colorName.toLowerCase()
          );

          // @Set default color
          const onSelectedColorVariant = (
            variants: variantsType,
            selectedColor: string
          ) => {
            const variant = variants.find(
              (variant) => variant.colorName.toLowerCase() === selectedColor
            );

            // console.log("FIND VARIANT => ", variant);
            setCurrentColorVariant(variant);
          };

          onSelectedColorVariant(variants, availableColorVariants[0]);
          console.log("CURRENT =>", currentColorVariant);

          return (
            <Box className="h-[550px] ">
              <Swiper
                onSwiper={(swiper) => {
                  if (swiper1Ref.current !== null) {
                    swiper1Ref.current = swiper;
                  }
                }}
                controller={{ control: secondSwiper }}
                spaceBetween={10}
                slidesPerView={1}
                grabCursor={true}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs, Controller]}
                className="w-[848px] h-[454px] rounded-xl"
              >
                {productImages(variants).map((variant) =>
                  variant.images.map((image, indx) => (
                    <SwiperSlide key={indx}>
                      <Box
                        component="img"
                        src={image}
                        sx={{
                          position: "relative",
                          height: "100%",
                          width: "100%",
                          maxWidth: 400,
                          objectFit: "contain",
                          left: 0,
                          top: 0,
                          right: 0,
                          bottom: 0,
                        }}
                        alt={`${name}-${variant.colorName}`}
                      />
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
              <Swiper
                controller={{ control: firstSwiper }}
                loop={false}
                spaceBetween={10}
                slidesPerView={8}
                watchSlidesProgress
                touchRatio={0.2}
                slideToClickedSlide={true}
                onSwiper={setThumbsSwiper}
                modules={[Navigation, Thumbs, Controller]}
                className="h-[100.4px] w-[848px] mt-[20px] rounded-xl"
              >
                {productImages(variants).map((variant) =>
                  variant.images.map((image, indx) => (
                    <SwiperSlide>
                      <Box
                        key={indx}
                        component="img"
                        src={image}
                        sx={{
                          width: "100%",
                          maxWidth: 60,
                          height: "auto",
                          borderRadius: 1,
                          border: "2px solid #ff8c00",
                          px: 0.4,
                          py: 0.8,
                          mb: 2,
                        }}
                        alt={`${name}-${variant.colorName}`}
                      />
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </Box>
          );
        }}
      </Await>
    </Suspense>
  );
}
