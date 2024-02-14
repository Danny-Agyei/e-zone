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

import { ProductType } from "../../types";
import ProductSkeleton from "../../components/Constant/ProductSkeleton";
import { TiStarFullOutline } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";
import { BsPlus, BsDash, BsTruck } from "react-icons/bs";
import { MdShoppingCart, MdCheckCircle } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { ProductDetails, ProductImageSlider } from "../../components";

const Product: React.FC = () => {
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
            storageCapacity !== undefined && storageCapacity !== null
              ? storageCapacity
              : storage![0];

          return (
            <Box px={10} py={8}>
              <Grid container columnSpacing={5}>
                <Grid item sm={12} md={6} sx={{ position: "sticky", top: 0 }}>
                  <ProductImageSlider
                    selectedVariant={selectedVariant}
                    name={name}
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={6}>
                  <Box>
                    <Link to={`shop/collection/brand/${brand}`}>
                      <Typography
                        variant="body2"
                        color="#666"
                        fontSize={14}
                        fontWeight={600}
                        pb={1.2}
                      >
                        {brand}
                      </Typography>
                    </Link>
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
                    <Divider
                      variant="fullWidth"
                      sx={{
                        borderColor: "#e5e5e5",
                      }}
                    />
                    <Typography
                      color="#666"
                      variant="body2"
                      fontSize={16}
                      py={1.2}
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
                        <BsDash size={20} color="#666" />
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
                          We deliver within 2 - 4S business days
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
              <ProductDetails product={product} description={description} />
            </Box>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Product;
