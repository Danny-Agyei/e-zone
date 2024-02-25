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

import { BsGrid } from "react-icons/bs";
import { CiGrid2H, CiGrid2V, CiBoxList } from "react-icons/ci";
import { FaListUl } from "react-icons/fa6";

import store from "../../lib/zustand/store";

// const fashionBrands = [
//   "Coofandy

//   Adidas

//   Nike

//   Tommy Hilfiger

//   Olevs

//   Champion

//   Hanes

//   Calvin Klein

//   Carhartt

//   Levi's

//   Puma

//   Lacoste

//   Skechers

//   Dickies

//   Thunderfit

//   Columbia

//   Amazon Essentials

//   New Balance

//   Polo Ralph Lauren

//   Magcomsen

//   Asics

//   Dockers

//   Nautica

//   Oakley

//   Under Armour

//   Jousen

//   Reebok

//   Muscularfit

//   Clarks

//   Bruno Marc

//   King Will

//   Thorogood

//   Ray-ban

//   Tacvasen

//   Ariat

//   Jockmail

//   Wrangler

//   Pj Paul Jones

//   Wrangler Authentics

//   Stetson

//   Invicta

//   Merrell

//   Timberland

//   Casio

//   Legendary Whitetails

//   Jmierr

//   Nortiv 8

//   Timberland Pro

//   Cole Haan

//   Ecco

//   Seiko

//   By Benyar

//   The North Face

//   Salomon

//   Adidas Originals

//   Saxx Underwear Co.

//   Hisdern

//   Fruit Of The Loom

//   G Gradual

//   David Archy

//   Van Heusen

//   Miabella

//   Fitville

//   Emporio Armani

//   Jockey

//   Tsar Bomba

//   Ikingsky

//   Zeroyaa

//   Lee

//   Cat

//   Rm Real Men

//   Bamboo Cool

//   Fossil

//   Gingtto

//   Vostey

//   Gildan

//   Larnmern

//   Michael Kors

//   Boss

//   Speedy Pros

//   Camel Crown

//   Ritche

//   Rockport

//   Aelfric Eden

//   Hugo Boss

//   Haorun

//   Crocs

//   A X Armani Exchange

//   Kudoro

//   Hzman

//   Chouyatou

//   Forsining

//   Suadex

//   Decrum

//   Rockrooster

//   Arkbird

//   Keen

//   Cherokee

//   Quiksilver"
// ]

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
