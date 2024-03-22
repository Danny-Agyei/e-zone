import React, { Suspense, useEffect, useState } from "react";
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
import { BsFillGridFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";

import { ProductType } from "../../types";
import ProductSkeleton from "../../components/Constant/ProductSkeleton";
import {
  ElectronicsFilter,
  ProductCard,
  UniversalFilter,
} from "../../components";
import Pagination from "@mui/material/Pagination";

import store from "../../lib/zustand/store";
import filterData from "../../filterData.json";
const { sortData } = filterData;

// @to delete
// pagination: {
//   start: 0,
//   limit: 10,
// },

export const PaginationControlled = function () {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  );
};

const Shop = () => {
  const loadedData = useLoaderData() as {
    data: Promise<{
      data: Promise<any>;
    }>;
  };

  // @ product view layout
  const [gridLayout, setGridLayout] = useState(3);

  // @ sort
  const [sortText, setSortText] = React.useState(sortData[0]);

  const onSortByHandler = (
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
  };

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    setOpen(false);
  };

  // @ shop filtering
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState({});

  useEffect(() => {}, [filterData]);

  const onFilterHandler: (data: { [key: string]: string }) => void = (
    data
  ) => {};

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
          // console.log("SHOP PRODUCTS =>", resolveData);
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
              <Grid
                container
                columnSpacing={4}
                sx={{ maxWidth: "100%", m: "0 auto" }}
              >
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
                <Grid sx={{ py: 8 }} item xs={12} sm={9} md={9}>
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
                              height: 205,
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
                                      onSortByHandler(event, data)
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
                        {[3, 4].map((grid, indx) => (
                          <Box
                            key={indx}
                            sx={{
                              position: "relative",
                            }}
                          >
                            <Radio
                              checked={gridLayout === grid ? true : false}
                              onChange={() => setGridLayout(grid)}
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
                  <Grid container spacing={2}>
                    {products.map((product, indx) => (
                      <Grid
                        lg={gridLayout}
                        md={gridLayout === 3 ? 4 : gridLayout}
                        sm={gridLayout === 3 ? 6 : 6}
                        xs={12}
                        item
                        key={indx}
                      >
                        <ProductCard product={product} />
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
