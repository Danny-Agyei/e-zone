import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ProductCardType } from "../../types";
import { useState } from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { v4 as uuid } from "uuid";

import store from "../../lib/zustand/store";

export default function ProductCard({ product }: { product: ProductCardType }) {
  const {
    attributes: {
      name,
      brand,
      price,
      slug,
      hasDiscount,
      discountPercent,
      variants,
      categories: { data: categoriesData },
    },
  } = product;

  const [isHover, setisHover] = useState(false);

  // @ discount calculation
  const discountInMoney = hasDiscount ? (price * discountPercent) / 100 : 0;

  // @ wishList
  const wishList = store.use.wishList();
  const addToWishList = store.use.addToWishList();

  const isOnWishList = wishList.some((item) => item.slug === slug);

  const onWishListHandler = () =>
    addToWishList({
      id: uuid(),
      name,
      price,
      slug,
      discountedPrice: discountInMoney,
      image: variants[0].images[0],
    });

  return (
    <Card
      sx={{
        // maxWidth: 300,
        width: "auto",
        boxShadow: "0 0 6px #eaeaea",
        border: "1px solid #eae5e5",
        borderRadius: 2,
        p: 2,
        pb: 3,
        height: 350,
        position: "relative",
      }}
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
    >
      {hasDiscount && (
        <Box
          component="span"
          sx={{
            position: "absolute",
            left: 15,
            top: 12,
            zIndex: 995,
            bgcolor: "text.secondary",
            px: 1,
            py: 0.5,
            borderRadius: 9999,
            fontSize: 10,
            fontWeight: 500,
          }}
        >
          -{discountPercent}%
        </Box>
      )}
      <Link to={`/products/${slug}`}>
        <Box sx={{ position: "relative", p: 2, pb: 22 }}>
          <CardMedia
            sx={{
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              maxHeight: 135,
              position: "absolute",
              top: 30,
              left: 0,
              visibility: isHover ? "hidden" : "visible",
              objectFit: "contain",
              opacity: isHover ? 0 : 1,
              transition:
                "opacity .25s ease-in-out, visibility .25s ease-in-out",
            }}
            component="img"
            src={variants[0].images[0]}
            alt={name}
          />

          <CardMedia
            sx={{
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              position: "absolute",
              maxHeight: 135,
              objectFit: "contain",
              top: 30,
              left: "0",
              visibility: !isHover ? "hidden" : "visible",
              opacity: !isHover ? 0 : 1,
              transition:
                "opacity .25s ease-in-out, visibility .25s ease-in-out",
            }}
            component="img"
            src={
              variants.length > 1
                ? variants[1].images[0]
                : variants[0].images.length > 1
                ? variants[0].images[1]
                : variants[0].images[0]
            }
            alt={name}
          />
        </Box>
      </Link>
      <CardContent sx={{ px: 1, pt: 2, pb: "0 !important" }}>
        <Typography
          variant="body2"
          fontSize={12}
          pb={1.5}
          fontWeight={500}
          color="#bf4800"
        >
          {brand}
        </Typography>
        <Link to={`/products/${slug}`}>
          <Typography variant="body2" fontSize={14} fontWeight={500}>
            {name}
          </Typography>
        </Link>
        <Box py={1.5}>
          <Box lineHeight={0}>
            <IoIosStar size={15} color="#ffc30e" />
            <IoIosStar size={15} color="#ffc30e" />
            <IoIosStar size={15} color="#ffc30e" />
            <IoIosStar size={15} color="#ffc30e" />
            <IoIosStar size={15} color="#ffc30e" />
          </Box>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          {hasDiscount && (
            <Typography
              variant="body2"
              fontSize={14}
              sx={{ textDecoration: "line-through" }}
            >
              ${price.toFixed(2)}
            </Typography>
          )}
          <Typography
            variant="body2"
            fontSize={14}
            fontWeight={500}
            color={hasDiscount ? "#e02b40" : "text.primary"}
          >
            ${hasDiscount ? (price - discountInMoney).toFixed(2) : price}
          </Typography>
          <Box sx={{ position: "absolute", top: 6, right: 5 }}>
            <IconButton
              onClick={onWishListHandler}
              sx={{ p: 0.5, "&:hover": { bgcolor: "#e5e5e5" } }}
            >
              {isOnWishList ? (
                <MdOutlineFavorite size={20} color="#1c1b1b" />
              ) : (
                <MdOutlineFavoriteBorder size={20} />
              )}
            </IconButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
