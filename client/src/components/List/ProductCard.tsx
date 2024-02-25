import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ProductCardType } from "../../types";
import { useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";

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

  return (
    <Card
      sx={{
        maxWidth: 300,
        width: "100%",
        boxShadow: "0 0 6px #eaeaea",
        border: "1px solid #eae5e5",
        borderRadius: 2,
        p: 2,
        position: "relative",
      }}
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
    >
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
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        -{discountPercent}%
      </Box>
      <Link to={`/products/${slug}`}>
        <Box sx={{ position: "relative", p: 2, pb: 18 }}>
          <CardMedia
            sx={{
              width: "100%",
              maxWidth: 130,
              height: "auto",
              m: "0 auto",
              position: "absolute",
              top: 30,
              left: "50%",
              transform: "translate(-50%,0)",
              visibility: isHover ? "hidden" : "visible",
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
              maxWidth: 130,
              height: "auto",
              m: "0 auto",
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translate(-50%,0)",
              visibility: !isHover ? "hidden" : "visible",
              opacity: !isHover ? 0 : 1,
              transition:
                "opacity .25s ease-in-out, visibility .25s ease-in-out",
            }}
            component="img"
            src={
              variants[0].images.length > 1
                ? variants[0].images[1]
                : variants[0].images[0]
            }
            alt={name}
          />
        </Box>
      </Link>
      <CardContent sx={{ px: 1, pt: 5, pb: 5 }}>
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
        </Stack>
      </CardContent>
    </Card>
  );
}
