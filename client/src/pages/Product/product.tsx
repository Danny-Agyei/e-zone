import React, {
  Suspense,
  useRef,
  useState,
  useLayoutEffect,
  lazy,
} from "react";

import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import { Await, useLoaderData } from "react-router-dom";
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
import ProductSkeleton from "../../components/Constant/ProductSkeleton";
import { TiStarFullOutline } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";
import { BsPlus, BsDash, BsTruck } from "react-icons/bs";
import { MdShoppingCart, MdCheckCircle } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

SwiperCore.use([Controller, Thumbs, Pagination, Navigation, Lazy]);

const Product: React.FC = () => {
  const loadedData = useLoaderData() as {
    data: Promise<{
      data: Promise<any>;
    }>;
  };

  type variantsType = ProductType["attributes"]["variants"];
  type storageType = ProductType["attributes"]["storage"];

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

  const [currentColorVariant, setCurrentColorVariant] = useState<
    variantsType[0] | null
  >(null);

  const [storageCapacity, setStorageCapacity] = useState<storageType[0]>();

  // @ handle color selection

  const onColorVarianthandler = (
    variants: variantsType,
    selectedColor: string
  ) => {
    const variant = variants.find(
      (variant) =>
        variant.colorName.toLowerCase() === selectedColor.toLowerCase()
    );
    setCurrentColorVariant(variant!);
  };

  // @handle capacity selection
  const onStorageCapacityHandler = (
    storage: storageType,
    selectedCapacity: string
  ) => {
    const storageCapacity = storage.find(
      (strg) => strg.capacity.toLowerCase() === selectedCapacity.toLowerCase()
    );
    setStorageCapacity(storageCapacity!);
  };

  // @ quantity select handler
  const [qty, setQty] = useState(1);

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <Await
        resolve={loadedData!.data}
        errorElement={<h1>Error loading Product data...</h1>}
      >
        {(resolveData) => {
          const { product }: { product: ProductType } = resolveData;
          const {
            attributes: { name, price, variants, storage, inStock },
          } = product;

          const availableColorVariants = variants.map((variant) =>
            variant.colorCode.toLowerCase()
          );

          // @ Selected current color or set default on load
          const selectedVariant =
            currentColorVariant !== undefined && currentColorVariant !== null
              ? currentColorVariant
              : variants![0];

          // @ Selected current capacity or set default on load
          const selectedCapacity =
            storageCapacity !== undefined && storageCapacity !== null
              ? storageCapacity
              : storage![0];

          return (
            <Box px={10} py={8}>
              <Grid container columnSpacing={5}>
                <Grid item sm={12} md={6} sx={{ position: "sticky", top: 0 }}>
                  <Box
                    sx={{
                      position: "sticky",
                      top: 100,
                    }}
                  >
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Box sx={{ height: "100%" }}>
                        <Swiper
                          loop={false}
                          spaceBetween={10}
                          slidesPerView={4}
                          // watchSlidesProgress
                          // touchRatio={0.2}
                          direction="vertical"
                          // slideToClickedSlide={true}
                          navigation
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
                            alignItems: "bottom",
                            top: 0,
                            left: 0,
                            zIndex: 999,
                            width: 42,
                            height: "auto",
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
                              <Box
                                sx={{
                                  width: "100%",
                                  height: "max-content",
                                  minHeight: 380,
                                  position: "relative",
                                }}
                              >
                                <Box
                                  className="swiper-lazy"
                                  component="img"
                                  src={image}
                                  data-src={image}
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    width: "100%",
                                    height: "100%",
                                    m: "0 auto",
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
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item sm={12} md={6} lg={6}>
                  <Box>
                    <Typography variant="h2" fontSize={26} fontWeight={600}>
                      {name} - {selectedVariant.colorName} Color{" "}
                      {selectedCapacity.capacity}
                    </Typography>
                  </Box>
                  <Box py={1.2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box lineHeight={0}>
                        <TiStarFullOutline size={20} color="#FF8C00" />
                        <TiStarFullOutline size={20} color="#FF8C00" />
                        <TiStarFullOutline size={20} color="#FF8C00" />
                        <TiStarFullOutline size={20} color="#FF8C00" />
                        <TiStarFullOutline size={20} color="#FF8C00" />
                      </Box>
                      <Typography variant="body2">(25 reviews)</Typography>
                    </Stack>
                  </Box>
                  <Typography variant="h3" fontSize={22} fontWeight={600}>
                    ${selectedCapacity.price}
                  </Typography>
                  <Box pt={2.5}>
                    <Typography
                      variant="body2"
                      color="#666"
                      fontSize={16}
                      fontWeight={500}
                      pb={1.2}
                    >
                      Colour :{" "}
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component="span"
                        fontSize={16}
                        fontWeight={600}
                      >
                        {selectedVariant.colorName}
                      </Typography>
                    </Typography>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      {variants.map((variant: variantsType[0], indx) => (
                        <Box
                          key={indx}
                          sx={{
                            position: "relative",
                          }}
                        >
                          <Radio
                            checked={
                              selectedVariant.colorName === variant.colorName
                            }
                            onChange={() =>
                              onColorVarianthandler(variants, variant.colorName)
                            }
                            value={variant.colorName}
                            title={variant.colorName}
                            name="radio-buttons"
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: 41,
                              height: 41,
                              borderRadius: "75%",
                              border: "1px solid #e1e1e1",
                              p: 0.4,
                              "& span": {
                                display: "none",
                              },
                              "&.Mui-checked": {
                                borderColor: "text.secondary",
                              },
                            }}
                          />

                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 9999,
                              p: 0.5,
                            }}
                          >
                            <Box
                              bgcolor={variant.colorCode}
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: 9999,
                              }}
                            ></Box>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                  <Box pt={2.5}>
                    <Typography
                      variant="body2"
                      color="#666"
                      fontSize={16}
                      fontWeight={500}
                      pb={1.2}
                    >
                      Capacity
                    </Typography>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      {storage.map((strg, indx) => (
                        <Box
                          key={indx}
                          sx={{
                            position: "relative",
                          }}
                        >
                          <Radio
                            checked={
                              strg.capacity.toLowerCase() ===
                              selectedCapacity.capacity.toLowerCase()
                            }
                            onChange={() =>
                              onStorageCapacityHandler(storage, strg.capacity)
                            }
                            value={strg.capacity}
                            title={strg.capacity}
                            name="radio-buttons"
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              bottom: 0,
                              width: "100%",
                              height: "100%",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              "& span": {
                                display: "none",
                              },
                              "&.Mui-checked": {
                                borderColor: "text.secondary",
                              },
                            }}
                          />

                          <Box
                            sx={{
                              p: "12px 16px",
                            }}
                          >
                            {strg.capacity}
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                  <Box pt={4}>
                    <Typography
                      color="#666"
                      variant="body2"
                      fontSize={16}
                      pb={1.2}
                    >
                      Availability :{" "}
                      <Typography
                        component="span"
                        fontSize={16}
                        fontWeight={600}
                      >
                        {inStock > 0 ? (
                          <Box component="span">
                            <Box component="span" color="text.primary">
                              In stock
                            </Box>{" "}
                            <FaCheck
                              color="#2FB783 "
                              size={15}
                              style={{ paddingTop: "10px" }}
                            />
                          </Box>
                        ) : (
                          "Out of Stock"
                        )}
                      </Typography>
                    </Typography>
                    {inStock > 0 && (
                      <Typography fontSize={16} variant="body2" color="red">
                        Only {inStock} items left in stock.
                      </Typography>
                    )}
                  </Box>
                  <Box pt={4}>
                    <Typography
                      color="#666"
                      variant="body2"
                      fontSize={16}
                      pb={1.2}
                    >
                      Quantity
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{
                        border: "1px solid #e1e1e1",
                        borderRadius: 9999,
                        maxWidth: "max-content",
                        height: 60,
                      }}
                    >
                      <Button
                        variant="text"
                        sx={{
                          borderRadius: " 9999px 0 0  9999px",
                          color: "#ebebea",
                        }}
                        onClick={() =>
                          setQty((prevValue) => (qty > 1 ? qty - 1 : prevValue))
                        }
                      >
                        <BsDash size={22} color="#666" />
                      </Button>
                      <InputBase
                        onChange={(e) =>
                          setQty((prevValue) =>
                            Number(e.target.value) > inStock
                              ? prevValue
                              : Number(e.target.value)
                          )
                        }
                        value={qty}
                        type="tel"
                        inputProps={{ maxLength: 2 }}
                        sx={{
                          width: 50,
                          px: 1,
                          border: "0 solid #e1e1e1",
                          borderLeftWidth: 1,
                          borderRightWidth: 1,
                          fontSize: 22,
                          "& input": {
                            textAlign: "center",
                          },
                        }}
                      />
                      <Button
                        variant="text"
                        sx={{
                          borderRadius: "0 9999px 9999px  0",
                          color: "#ebebea",
                        }}
                        onClick={() =>
                          setQty((prevValue) =>
                            qty < inStock ? qty + 1 : prevValue
                          )
                        }
                      >
                        <BsPlus size={22} color="#666" />
                      </Button>
                    </Stack>
                    <Button
                      variant="contained"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "text.secondary",
                        mt: 4,
                        width: "100%",
                        p: 2,
                        boxShadow: "none !important",
                        "&:hover": {
                          bgcolor: "rgba(255,140, 0, 0.9) !important",
                        },
                      }}
                    >
                      <MdShoppingCart size={22} color="#13131a" />
                      <Typography
                        variant="body2"
                        fontSize={20}
                        component="span"
                        color="text.primary"
                        fontWeight={600}
                      >
                        ADD TO CART
                      </Typography>
                    </Button>
                  </Box>
                  <Typography
                    pt={4}
                    fontSize={22}
                    variant="body1"
                    fontWeight={600}
                  >
                    Ways to get your order
                  </Typography>
                  <Box
                    sx={{ border: "1px solid #e1e1e1", px: 4, py: 2.5, mt: 2 }}
                  >
                    <Stack direction="row" spacing={6}>
                      <Box sx={{ position: "relative" }}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            left: 10,
                            zIndex: -1,
                          }}
                        >
                          <BsTruck size={30} />
                        </Box>
                        <MdCheckCircle
                          color="#2FB783"
                          size={20}
                          style={{ zIndex: 9999 }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontSize={16}>
                          Deliver available
                        </Typography>
                        <Typography py={1} variant="body2" fontSize={16}>
                          We deliver within 5 business days
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          fontSize={18}
                          fontWeight={600}
                        >
                          Free shipping{" "}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          fontSize={16}
                        >
                          on orders over $90
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={6}
                      sx={{ borderTop: "1px solid #e1e1e1", mt: 2, pt: 2 }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            left: 10,
                            zIndex: -1,
                          }}
                        >
                          <IoStorefrontOutline size={30} />
                        </Box>
                        <MdCheckCircle
                          color="#2FB783"
                          size={20}
                          style={{ zIndex: 9999 }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontSize={16}>
                          Free Pickup available
                        </Typography>
                        <Typography py={1} variant="body2" fontSize={16}>
                          Ready for pickup in stores within 2 hours
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          fontSize={16}
                        >
                          Pickup at{" "}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          fontSize={18}
                          fontWeight={600}
                        >
                          Accra - 45 Graphic Road
                        </Typography>

                        <Typography
                          variant="body2"
                          fontSize={16}
                          color="red"
                          pt={2}
                        >
                          {inStock} in stock
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Product;
