import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 10;

export default function PriceRageSlider() {
  const [value, setValue] = useState<number[]>([10, 28000]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant="body2" pb={1.5} fontWeight={600}>
          Price Range
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" fontSize={13}>
            8
          </Typography>

          <Typography variant="body2" fontSize={13}>
            30,000
          </Typography>
        </Stack>
        <Slider
          // getAriaLabel={() => "Minimum distance"}
          min={8}
          max={30000}
          value={value}
          onChange={handleChange}
          getAriaValueText={valuetext}
          disableSwap
          color="warning"
          sx={{
            "& .MuiSlider-track": {
              border: "none",
              borderRadius: 0,
              bgcolor: "text.secondary",
              height: 15,
            },
            "& .MuiSlider-rail": {
              height: 15,
              opacity: 0.2,
              boxShadow: "none",
              border: "none",
              bgcolor: "text.secondary",
            },
            "& .MuiSlider-thumb ": {
              boxShadow: "none !important",
              width: 4,
              borderRadius: 0,
            },
          }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" fontSize={13}>
            $
            <Box
              component="span"
              sx={{
                border: "1px solid #f2ecec",
                py: 0.5,
                px: 2,
                ml: 0.5,
              }}
            >
              {value[0]}
            </Box>
          </Typography>
          <Typography variant="body2" fontSize={13} fontWeight={600}>
            -
          </Typography>
          <Typography
            variant="body2"
            fontSize={13}
            sx={{ border: "1px solid #f2ecec", py: 0.5, px: 2 }}
          >
            {value[1]}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
