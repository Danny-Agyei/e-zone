import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  List,
  ListItemText,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import SideBarItem from "../List/SideBarItem";
import { Link, useLocation } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";
import filterData from "../../filterData.json";

export default function UniversalFilter() {
  const {
    electronicBrands,
    electronicsCategories,
    fashionCategories,
    fashionBrands,
    defaultCategories,
  } = filterData;

  const location = useLocation();

  const pathname = location.pathname.toLowerCase();
  const categoryName = pathname.slice(pathname.lastIndexOf("/") + 1);

  const categories =
    categoryName === "electronics"
      ? electronicsCategories
      : categoryName === "fashion"
      ? fashionCategories
      : defaultCategories;

  const brands =
    categoryName === "electronics"
      ? electronicBrands
      : categoryName === "fashion"
      ? fashionBrands
      : electronicBrands.concat(fashionBrands);

  // @Price range slider
  const minDistance = 10;
  const [value, setValue] = useState<number[]>([10, 28000]);

  function valuetext(value: number) {
    return `${value}°C`;
  }

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

  // @ Brand search

  const [searchData, setSearchData] = useState(brands);

  const onSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const searchMatched = searchData.filter((data) =>
      data.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchData(searchMatched);
  };

  // @ Check handler
  const onCheckHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updatedData = searchData.map((data) => {
      if (id === data.id) {
        return { ...data, check: !data.check };
      }
      return data;
    });
    setSearchData(updatedData);
  };

  return (
    <>
      <Box>
        <Box sx={{ p: 1.5, boxShadow: "0 0 5px #e5e5e5" }}>
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
      <Box sx={{ p: 1.5, boxShadow: "0 0 5px #e5e5e5", mt: 2 }}>
        <Typography variant="body2" fontWeight={600}>
          Brands
        </Typography>
        <Box
          sx={{
            maxWidth: 550,
            display: "flex",
            alignItems: "center",
            height: 35,
            p: 1,
            mt: 2,
            mb: 2,
            border: "1px solid #f2ecec",
            borderRadius: 1,
          }}
        >
          <IconButton
            sx={{
              cursor: "default",
              bgcolor: "text.secondary",
              borderRadius: 1.5,
              p: 0.5,
              "&:hover": {
                bgcolor: "text.secondary",
              },
            }}
          >
            <BiSearch color="#fff" size={20} />
          </IconButton>
          <InputBase
            onChange={onSearchHandler}
            fullWidth
            placeholder="Search by brand"
            sx={{
              p: 1,
              fontSize: 14,
              color: "#777",
              height: "100%",
            }}
          />
        </Box>
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
            {searchData.map((brand, indx) => (
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
                title={brand.title}
                control={
                  <Checkbox
                    onChange={(e) => onCheckHandler(e, brand.id)}
                    checked={brand.check}
                    value={brand}
                  />
                }
                label={brand.title}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
      <Box sx={{ p: 1.5, boxShadow: "0 0 5px #e5e5e5", mt: 2 }}>
        {categoryName === "electronics" || categoryName === "fashion" ? (
          <SideBarItem
            expand={true}
            title="Categories"
            listData={categories}
            placeholderText="Search by category"
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
                    <Link to={category.title}>
                      <Button
                        title={category.title}
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
                        <Typography variant="body2" color="#777" fontSize={13}>
                          {category.title}
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
