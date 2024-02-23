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
          const { product }: { product: ProductType } = resolveData;
          //   const {
          //     attributes: {
          //       name,
          //       price,
          //       model_name,
          //       brand,
          //       description,
          //       variants,
          //       storage,
          //       inStock,
          //     },
          //   } = product;

          return (
            <Box px={10}>
              <Grid container>
                <Grid item xs={3}>
                  <Box
                    sx={{
                      borderRight: "1px solid #f2ecec",
                      py: 8,
                      pr: 2,
                    }}
                  >
                    <UniversalFilter />
                    <ElectronicsFilter />
                  </Box>
                </Grid>
                <Grid item xs={9}></Grid>
              </Grid>
            </Box>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Shop;
