import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItemText,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import SideBarItem from "../List/SideBarItem";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const defaultCategories = [
  "Electronics",
  "Computers & Accessories",
  "Computers & Tablets",
  "2 in 1 Laptop Computers",
];

const electronicsCategories = [
  "Electronics",
  "Computers & Accessories",
  "Computers & Tablets",
  "2 in 1 Laptop Computers",
];

const fashionCategories = [
  "Electronics",
  "Computers & Accessories",
  "Computers & Tablets",
  "2 in 1 Laptop Computers",
];

const electronicBrands = [
  "Sony",
  "Jbl",
  "Canon",
  "Apple",
  "Samsung",
  "Electronics Basket",
  "Microsoft",
  "Asus",
  "Lg",
  "Lenovo",
  "Raising Electronics",
];

export default function UniversalFilter() {
  const location = useLocation();

  const pathname = location.pathname.toLowerCase();
  const categoryName = pathname.slice(pathname.lastIndexOf("/") + 1);

  const categories =
    categoryName === "electronics"
      ? electronicsCategories
      : pathname === "fashion"
      ? fashionCategories
      : defaultCategories;

  // @Price range slider
  function valuetext(value: number) {
    return `${value}°C`;
  }

  const minDistance = 10;

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
    <>
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
            getAriaLabel={() => "Minimum distance"}
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
            <Typography
              variant="body2"
              fontSize={13}
              sx={{
                border: "1px solid #f2ecec",
                py: 0.5,
                px: 2,
                ml: 0.5,
                width: "40%",
              }}
            >
              ${value[0]}
            </Typography>
            <Typography
              sx={{ width: "20%", textAlign: "center" }}
              variant="body2"
              fontSize={13}
              fontWeight={600}
            >
              -
            </Typography>
            <Typography
              variant="body2"
              fontSize={13}
              sx={{ border: "1px solid #f2ecec", py: 0.5, px: 2, width: "40%" }}
            >
              ${value[1]}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Box pt={4}>
        <Typography variant="body2" fontWeight={600}>
          Brand
        </Typography>
        <Box
          sx={{
            height: 300,
            mt: 1,
            overflow: "auto",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              bgcolor: "#eee",
              width: 6,
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 0.5,
              bgcolor: "text.secondary",
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                bgcolor: "text.secondary",
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
          }}
        >
          <FormGroup>
            {electronicBrands.map((brand, indx) => (
              <FormControlLabel
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#666",
                  },
                  "& .MuiCheckbox-root": {
                    color: "#eaeaea",
                    "&:hover": { color: "text.secondary" },
                  },
                  "& .MuiCheckbox-root.Mui-checked": {
                    color: "text.secondary",
                    "&:hover": { color: "text.secondary" },
                  },
                }}
                key={indx}
                title={brand}
                control={<Checkbox value={brand} />}
                label={brand}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
      <Box pt={4}>
        {categoryName === "electronics" || categoryName === "fashion" ? (
          <SideBarItem
            expand={true}
            hasSearchBar={true}
            title="Categories"
            listData={categories}
            palceholderText="Search by category"
          />
        ) : (
          <>
            <Typography pb={1} variant="body2" fontWeight={600}>
              Category
            </Typography>
            <List sx={{ p: 0 }}>
              {defaultCategories.map((category, indx) => (
                <ListItemText
                  sx={{ py: 0.5 }}
                  key={indx}
                  primary={
                    <Link to={category}>
                      <Button
                        title={category}
                        fullWidth
                        sx={{
                          p: 0,
                          display: "block",
                          textAlign: "left",
                          textTransform: "capitalize",
                          color: "transparent",
                          "&:hover": { bgcolor: "transparent" },
                        }}
                      >
                        <Typography variant="body2" color="#666" fontSize={13}>
                          {category}
                        </Typography>
                      </Button>
                    </Link>
                  }
                />
              ))}
            </List>
          </>
        )}
      </Box>
    </>
  );
}
