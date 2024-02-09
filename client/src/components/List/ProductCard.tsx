import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  TiStar,
  TiStarOutline,
  TiStarHalfOutline,
  TiStarFullOutline,
} from "react-icons/ti";
import { AiFillStar } from "react-icons/ai";
import { ProductCardType } from "../../types";
import { useState } from "react";

export default function ProductCard({ product }: { product: ProductCardType }) {
  const {
    attributes: {
      name,
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
      sx={{ maxWidth: 300, boxShadow: "none" }}
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
    >
      <Link to={`/products/${slug}`}>
        <Box p={2} sx={{ position: "relative", pb: 24 }}>
          <CardMedia
            sx={{
              width: 220,
              height: "auto",
              m: "0 auto",
              position: "absolute",
              top: 0,
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
              width: 220,
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
      <CardContent sx={{ px: 0, pt:5}}>
        <Link to={`/products/${slug}`}>
          <Typography variant="h3" fontSize={16} fontWeight={600}>
            {name}
          </Typography>
        </Link>
        <Box py={1.2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box lineHeight={0}>
              <TiStarFullOutline size={20} color="#FF8C00" />
              <TiStarFullOutline size={20} color="#FF8C00" />
              <TiStarFullOutline size={20} color="#FF8C00" />
              <TiStarFullOutline size={20} color="#FF8C00" />
              <TiStarFullOutline size={20} color="#FF8C00" />
            </Box>
            <Typography variant="body2">( 25 reviews )</Typography>
          </Stack>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" fontSize={16} fontWeight={600}>
            ${hasDiscount ? (price - discountInMoney).toFixed(2) : price}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="h6"
              color="#999"
              fontSize={16}
              sx={{ textDecoration: "line-through" }}
            >
              ${price.toFixed(2)}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
