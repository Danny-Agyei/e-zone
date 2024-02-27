import React, { Suspense, useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItemText,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { Await, useLoaderData } from "react-router-dom";
import { ProductType } from "../../types";
import ProductSkeleton from "../../components/Constant/ProductSkeleton";
import {
  ElectronicsFilter,
  ProductCard,
  UniversalFilter,
} from "../../components";

import { BsFillGridFill } from "react-icons/bs";
import { CiGrid2H, CiGrid2V, CiBoxList } from "react-icons/ci";
import { FaListUl } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";

import store from "../../lib/zustand/store";
import { MdKeyboardArrowDown } from "react-icons/md";

const sortData = ["High to Low", "Low to Top", "Best Selling", "A-Z"];
const Shop = () => {
  const loadedData = useLoaderData() as {
    data: Promise<{
      data: Promise<any>;
    }>;
  };

  // @ product view layout
  const [gridLayout, setGridLayout] = useState(4);

  // @ sort
  const [sortText, setSortText] = React.useState(sortData[0]);

  const handleSelect = (
    event: React.MouseEvent<HTMLDivElement>,
    selectedText: string
  ) => {
    event.stopPropagation();
    setSortText(selectedText);
    setOpen(false);
  };

  // @ menu toggler
  const [open, setOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(true);
    console.log("open");
  };

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    setOpen(false);
    console.log("click");
  };

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <Await
        resolve={loadedData!.data}
        errorElement={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <Typography variant="body1" fontSize={40} fontWeight={600}>
              {" "}
              Error loading Product data...
            </Typography>
          </Box>
        }
      >
        {(resolveData) => {
          const { products }: { products: ProductType[] } = resolveData;
          // const {
          //   attributes: {
          //     name,
          //     price,
          //     model_name,
          //     brand,
          //     description,
          //     variants,
          //     storage,
          //     inStock,
          //   },
          // } = product;

          return (
            <Box px={10} onClick={handleClose}>
              <Grid container columnSpacing={4}>
                <Grid item xs={12} sm={3} md={3}>
                  <Box
                    sx={{
                      borderRight: "1px solid #eae5e5",
                      py: 8,
                      pr: 2,
                    }}
                  >
                    <UniversalFilter />
                    <ElectronicsFilter />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={9} md={9} sx={{ py: 8 }}>
                  <Typography
                    variant="body2"
                    mb={4}
                    fontSize={20}
                    fontWeight={600}
                  >
                    Best Selling Eletroncis
                  </Typography>
                  <Box
                    mb={2}
                    sx={{ boxShadow: "0 0 5px #e5e5e5", borderRadius: 1, p: 2 }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography variant="body2" fontWeight={500} pr={2}>
                          Sort By:
                        </Typography>
                        <Box
                          component="button"
                          sx={{
                            position: "relative",
                            bgcolor: "transparent",
                            border: "none",
                            p: 0,
                            textTransform: "capitalize",
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={handleClick}
                        >
                          <Typography
                            variant="body2"
                            component="span"
                            fontSize={13}
                            color="#777"
                          >
                            {sortText}
                          </Typography>
                          <MdKeyboardArrowDown size={22} color="#1c1b1b" />
                          <List
                            disablePadding
                            sx={{
                              bgcolor: "#fff",
                              borderRadius: 1,
                              position: "absolute",
                              top: open ? 35 : 50,
                              visibility: open ? "visible" : "hidden",
                              opacity: open ? 1 : 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              zIndex: 996,
                              width: 150,
                              height: 168,
                              boxShadow: "0 0 5px #ccc",
                              transition: "all .10s ease-in-out",
                              "& .MuiListItemText-root:last-child": {
                                borderBottom: "0 !important",
                              },
                            }}
                          >
                            {sortData.map((data, indx) => (
                              <ListItemText
                                key={indx}
                                sx={{ borderBottom: "1px solid #eaeaea", p: 0 }}
                                primary={
                                  <Box
                                    component="div"
                                    onClick={(event) =>
                                      handleSelect(event, data)
                                    }
                                    sx={{
                                      display: "block",
                                      textTransform: "capitalize",
                                      color: "text.primary",
                                      justifyContent: "left",
                                      py: 1,
                                      px: 2,
                                      "&:hover": { bgcolor: "#eaeaea" },
                                    }}
                                  >
                                    <Typography fontSize={13}>
                                      {data}
                                    </Typography>
                                  </Box>
                                }
                              />
                            ))}
                          </List>
                        </Box>
                      </Box>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        {[4, 2].map((grid, indx) => (
                          <Box
                            key={indx}
                            sx={{
                              position: "relative",
                            }}
                          >
                            <Radio
                              checked={gridLayout === grid ? true : false}
                              onChange={() => setGridLayout(grid)}
                              // value={strg.capacity}
                              // title={strg.capacity}
                              name="radio-buttons"
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: 1,
                                border: "1px solid #e1e1e1",
                                transition: "all .35s ease-in-out",
                                "& span": {
                                  display: "none",
                                },
                                "&.Mui-checked": {
                                  borderColor: "text.primary",
                                  bgcolor: "rgba(0,0,0,0.01 )",
                                },
                              }}
                            />
                            <Box
                              sx={{
                                p: "6px",
                                pb: "3px",
                                borderRadius: 1,
                                "&:hover": { bgcolor: "red" },
                              }}
                            >
                              {grid === 4 ? (
                                <BsFillGridFill
                                  size={23}
                                  color="#1c1b1b"
                                  style={{ zIndex: 999 }}
                                />
                              ) : (
                                <TbListDetails
                                  size={23}
                                  color="#1c1b1b"
                                  style={{ zIndex: 999 }}
                                />
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Stack>
                  </Box>
                  <Grid container columnSpacing={8} rowSpacing={4}>
                    {Array.from({ length: 12 }, (_, indx) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={indx}>
                        <ProductCard product={products[0]} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Shop;
