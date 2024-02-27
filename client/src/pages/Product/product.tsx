import React, { Suspense, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import { Await, Link, useLoaderData } from "react-router-dom";
import { TiStarFullOutline } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";
import { BsPlus, BsDash, BsTruck } from "react-icons/bs";
import { MdShoppingCart, MdCheckCircle } from "react-icons/md";
import { SwiperSlide } from "swiper/react";
import { v4 as uuid } from "uuid";

import { IoStorefrontOutline } from "react-icons/io5";
import { ProductType } from "../../types";
import ProductSkeleton from "../../components/Constant/ProductSkeleton";
import {
  CustomSlider,
  ProductCard,
  ProductDetails,
  ProductImageSlider,
} from "../../components";
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";

import store from "../../lib/zustand/store";

const Product = () => {
  const addToCart = store.use.addToCart();
  const removeFromCart = store.use.removeFromCart();

  const loadedData = useLoaderData() as {
    data: Promise<{
      data: Promise<any>;
    }>;
  };

  type storageType = ProductType["attributes"]["storage"];
  type variantsType = ProductType["attributes"]["variants"];

  const [currentColorVariant, setCurrentColorVariant] = useState<
    variantsType[0] | null
  >(null);

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
  const [storageCapacity, setStorageCapacity] = useState<storageType[0]>();

  const onStorageCapacityHandler = (
    storage: storageType,
    selectedCapacity: string
  ) => {
    const storageCapacity = storage.find(
      (strg) => strg.capacity.toLowerCase() === selectedCapacity.toLowerCase()
    );
    setStorageCapacity(storageCapacity!);
  };

  // @ cart handler
  const [qty, setQty] = useState(1);

  const onAddToCartHandler = ({
    id,
    price,
    inStock,
    qty,
    name,
    color,
    image,
  }: {
    price: number;
    qty: number;
    inStock: number;
    color: string;
    id: string;
    name: string;
    image: string;
  }) => addToCart({ id, inStock, name, price, qty, color, image });

  return (
    <Suspense fallback={<ProductSkeleton />}>
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
              model_name,
              brand,
              description,
              variants,
              storage,
              inStock,
            },
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
            storage !== null
              ? storageCapacity !== undefined && storageCapacity !== null
                ? storageCapacity
                : storage![0]
              : null;

          return (
            <Box px={10} pt={8}>
              <Grid container columnSpacing={5}>
                <Grid
                  item
                  sm={12}
                  md={6}
                  sx={{ position: "sticky", top: 0, pt: 8 }}
                >
                  <ProductImageSlider
                    selectedVariant={selectedVariant}
                    name={name}
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={6}>
                  <Box>
                    <Typography variant="body2" fontSize={18} fontWeight={600}>
                      {name} - {selectedVariant.colorName} Color{" "}
                      {storage !== null && selectedCapacity!.capacity}
                    </Typography>
                  </Box>
                  <Box py={1.8}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box lineHeight={0}>
                        <IoIosStar size={15} color="#ffc30e" />
                        <IoIosStar size={15} color="#ffc30e" />
                        <IoIosStar size={15} color="#ffc30e" />
                        <IoIosStar size={15} color="#ffc30e" />
                        <IoIosStar size={15} color="#ffc30e" />
                      </Box>
                      <Typography variant="body2" fontSize={13} color="#777">
                        (25 reviews)
                      </Typography>
                    </Stack>
                  </Box>
                  <Divider
                    variant="fullWidth"
                    sx={{
                      borderColor: "#eaeaea",
                    }}
                  />
                  <Box pt={2.5}>
                    <Link to={`shop/collection/brand/${brand}`}>
                      <Typography
                        variant="body2"
                        fontSize={14}
                        fontWeight={500}
                        pb={2}
                      >
                        Brand :{" "}
                        <Typography
                          variant="body2"
                          fontSize={13}
                          fontWeight={500}
                          color="#777"
                          component="span"
                        >
                          {brand}
                        </Typography>
                      </Typography>
                    </Link>

                    <Typography
                      variant="body2"
                      fontSize={14}
                      fontWeight={500}
                      pb={1.2}
                    >
                      Colour
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
                  {storage !== null && (
                    <Box pt={2.5}>
                      <Typography
                        variant="body2"
                        fontSize={14}
                        fontWeight={500}
                        pb={1.2}
                      >
                        Storage
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
                                selectedCapacity!.capacity.toLowerCase()
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
                                borderRadius: 1,
                                border: "1px solid #eaeaea",
                                "& span": {
                                  display: "none",
                                },
                                "&.Mui-checked": {
                                  borderColor: "text.primary",
                                },
                              }}
                            />

                            <Box
                              sx={{
                                p: "12px 14px",
                                fontSize: 14,
                                fontWeight: 500,
                                color: "#777",
                              }}
                            >
                              {strg.capacity}
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}
                  <Box pt={4}>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        borderColor: "#eaeaea",
                      }}
                    />
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      fontSize={14}
                      py={1.2}
                    >
                      Availability :{" "}
                      <Typography component="span" fontSize={14}>
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
                      <Typography fontSize={14} variant="body2" color="red">
                        Only {inStock} items left in stock.
                      </Typography>
                    )}
                  </Box>
                  <Box pt={4}>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      fontSize={14}
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
                        <BsDash size={20} color="#666" />
                      </Button>
                      <InputBase
                        onBlur={(e) =>
                          Number(e.target.value) === 0 && setQty(1)
                        }
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
                          fontSize: 17,
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
                        <BsPlus size={20} color="#666" />
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
                          bgcolor: "#eea501 !important",
                        },
                      }}
                      onClick={() =>
                        addToCart({
                          id: uuid(),
                          name,
                          price:
                            storage !== null ? selectedCapacity!.price : price,
                          qty,
                          color: selectedVariant.colorName,
                          image: selectedVariant.images[0],
                          inStock,
                        })
                      }
                    >
                      <MdShoppingCart size={22} color="#13131a" />
                      <Typography
                        variant="body2"
                        fontSize={16}
                        component="span"
                        color="text.primary"
                        fontWeight={500}
                      >
                        ADD TO CART - $
                        {storage !== null ? selectedCapacity!.price : price}
                      </Typography>
                    </Button>
                  </Box>
                  <Typography
                    pt={4}
                    fontSize={16}
                    variant="body1"
                    fontWeight={500}
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
                        <Typography variant="body2" fontSize={14}>
                          Deliver available
                        </Typography>
                        <Typography py={1} variant="body2" fontSize={14}>
                          We deliver within 2 - 4S business days
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          fontSize={18}
                          fontWeight={500}
                        >
                          Free shipping{" "}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          fontSize={14}
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
                        <Typography variant="body2" fontSize={14}>
                          Free Pickup available
                        </Typography>
                        <Typography py={1} variant="body2" fontSize={14}>
                          Ready for pickup in stores within 2 hours
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          fontSize={14}
                        >
                          Pickup at{" "}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          fontSize={18}
                          fontWeight={500}
                        >
                          Accra - 45 Graphic Road
                        </Typography>

                        <Typography
                          variant="body2"
                          fontSize={14}
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
              <ProductDetails product={product} description={description} />
              <Box id="category-slide" position="relative">
                <Typography variant="h2" fontSize={22} fontWeight={500}>
                  You may like this
                </Typography>
                <Divider
                  variant="fullWidth"
                  sx={{
                    borderColor: "text.secondary",
                    maxWidth: 180,
                    borderWidth: 1,
                    mt: 2,
                    mb: 4,
                  }}
                />
                <CustomSlider top={180} left={1} right={1}>
                  {Array.from({ length: 8 }, (_, indx) => (
                    <SwiperSlide key={indx} style={{ width: "20% !important" }}>
                      <Box sx={{ minWidth: 200 }}>
                        <ProductCard product={product} />
                      </Box>
                    </SwiperSlide>
                  ))}
                </CustomSlider>
              </Box>
            </Box>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Product;
