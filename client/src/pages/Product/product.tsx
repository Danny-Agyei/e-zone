import { Box, Grid, Stack } from "@mui/material";
import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { ProductType } from "../../types";
import SwiperCore, { Navigation, Scrollbar, Controller } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Scrollbar]);

export default function Product() {
  const loadedData = useLoaderData() as {
    data: Promise<{
      data: Promise<any>;
    }>;
  };
  const [controlledSwiper, setControlledSwiper] = useState(null);

  //@todo
  // $(".swiper-button-next").click(function () {
  //   var currentActiveSlide = $(".swiper-slide-active img").attr("src");

  //   $("#main_image img").attr("src", currentActiveSlide);
  // });
  // $(".swiper-button-prev").click(function () {
  //   var currentActiveSlide = $(".swiper-slide-active img").attr("src");

  //   $("#main_image img").attr("src", currentActiveSlide);
  // });

  const [swipe, setSwipe] = useState<any>({});

  const [currentVariantId, setCurrentVariantId] = useState(1);

  type variantsType = ProductType["attributes"]["variants"];

  //@ Product images modify
  const productImages = (variants: variantsType) => {
    const modifyVariants = variants.map((variant, indx) => ({
      id: indx + 1,
      ...variant,
    }));

    console.log(modifyVariants);

    return modifyVariants;
  };

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

          return (
            <Box px={10} py={8}>
              <Grid container>
                <Grid item sm={12} md={6} sx={{ position: "sticky", top: 0 }}>
                  {productImages(variants).map((variant) => (
                    <Box
                      id={variant.id.toString()}
                      key={variant.id}
                      sx={{
                        display:
                          variant.id === currentVariantId ? "block" : "none",
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <Stack direction="row">
                        <Box sx={{ height: "100%" }}>
                          <Swiper
                            spaceBetween={40}
                            // allowTouchMove={false}
                            slidesPerView={4}
                            centeredSlides={true}
                            // loop={true}
                            direction="vertical"
                            style={{ width: "max-content" }}
                          >
                            {variant.images.map((image, indx) => (
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
                                  }}
                                  alt={`${name}-${variant.colorName}`}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
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
                            // onInit={(ev) => setSwipe(ev)}
                            spaceBetween={5}
                            allowTouchMove={false}
                            slidesPerView={1}
                            centeredSlides={true}
                            loop={true}
                            style={{ width: "100%", height: "100%" }}
                          >
                            {variant.images.map((image, indx) => (
                              <SwiperSlide key={indx}>
                                <Box
                                  component="img"
                                  src={image}
                                  sx={{
                                    position: "absolute",
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain",
                                    left: 0,
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                  }}
                                  alt={`${name}-${variant.colorName}`}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Grid>
                <Grid item sm={12} md={6}>
                  <Box>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Impedit provident ipsum repudiandae optio labore, temporibus
                    error vitae voluptates alias veniam. Nisi laudantium
                    consequatur, fuga rem aliquam ipsum iure? Possimus, ex?
                  </Box>
                </Grid>
              </Grid>
            </Box>
          );
        }}
      </Await>
    </Suspense>
  );
}
