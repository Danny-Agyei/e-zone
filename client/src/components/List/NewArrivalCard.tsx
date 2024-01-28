import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BannerType } from "../../types";

export default function NewArrivalCard({
  bannerData,
}: {
  bannerData: BannerType;
}) {
  const {
    attributes: {
      heading,
      description,
      cover: {
        data: {
          attributes: { url: coverImg },
        },
      },
    },
  } = bannerData;

  return (
    <Link to="/#">
      <Box
        sx={{
          width: "100%",
          maxHeight: 265,
          height: "100%",
          position: "relative",
          borderRadius: 5,
          border: "2px solid #eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxHeight: "100%",
          }}
          component="img"
          src={`${process.env.REACT_APP_BASE_URL}${coverImg}`}
          alt={heading}
        />

        <Box
          sx={{
            maxWidth: "60%",
            position: "absolute",
            top: "80%",
            transform: "translate(0,-80%)",
            right: 0,
            zIndex: 977,
            bgcolor: "#ffffff",
            borderRadius: "5px 0 0 5px",

            boxShadow: "rgba(230, 230, 230, 0.5) 0px 8px 24px",
            p: 2,
          }}
        >
          <Typography variant="h4" fontSize={16} pb={2} fontWeight={900}>
            {heading}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </Box>
      </Box>
    </Link>
  );
}
