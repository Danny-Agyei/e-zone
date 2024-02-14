import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";

const labels: { [index: string]: string } = {
  1: "very Bad",
  2: "Poor",
  3: "Okay",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating() {
  const [value, setValue] = React.useState<number | null>(5);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        icon={<TiStarFullOutline fontSize="inherit" />}
        emptyIcon={<TiStarOutline fontSize="inherit" color="#ccc" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
