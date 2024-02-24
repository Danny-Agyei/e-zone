import React, { Suspense, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import { Await, Link, useLoaderData } from "react-router-dom";
import { ProductType } from "../../types";
import ProductSkeleton from "../../components/Constant/ProductSkeleton";
import {
  ElectronicsFilter,
  ProductCard,
  UniversalFilter,
} from "../../components";

import store from "../../lib/zustand/store";

const Shop = () => {
  const loadedData = useLoaderData() as {
    data: Promise<{
      data: Promise<any>;
    }>;
  };

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <Await
        resolve={loadedData!.data}
        errorElement={<h1>Error loading Product data...</h1>}
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
            <Box px={10}>
              <Grid container columnSpacing={4}>
                <Grid item xs={3}>
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
                <Grid item xs={9} sx={{ py: 8 }}>
                  <Typography
                    variant="body2"
                    mb={4}
                    fontSize={20}
                    fontWeight={600}
                  >
                    Best Selling Eletroncis
                  </Typography>
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
