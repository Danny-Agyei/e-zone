import { Box, Card, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartegoryCard({
  imgUrl,
  title,
  cartegoryUrl,
}: {
  imgUrl: string;
  title: string;
  cartegoryUrl: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <Link to={cartegoryUrl} style={{ display: "block", width: 160 }}>
      <Card
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        sx={{
          width: 160,
          height: 160,
          border: "2px solid #ededed",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            p: 2,
          }}
        >
          <CardMedia
            sx={{
              width: 90,
              height: 80,
              m: "0 auto 0",
              objectFit: "contain",
              transition: "transform .25s ease-in-out;",
              transform: active
                ? "scale(1.2) !important"
                : "scale(1) !important",
            }}
            component="img"
            image={imgUrl}
            alt={title}
            title={title}
          />
          <Typography
            sx={{
              pt: 3,
            }}
            textAlign="center"
            fontWeight={600}
            fontSize={16}
            variant="h3"
          >
            {title}
          </Typography>
        </Box>
      </Card>
    </Link>
  );
}
