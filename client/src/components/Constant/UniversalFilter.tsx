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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
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
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const pathname = location.pathname.toLowerCase();
  const categoryName = pathname.slice(pathname.lastIndexOf("/") + 1);

  const categories =
    categoryName === "electronics"
      ? electronicsCategories
      : categoryName === "fashion"
      ? fashionCategories
      : defaultCategories;

  const brandData =
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

  const [brands, setBrandData] = useState(brandData);
  const [searchData, setSearchData] = useState(brands);

  const onSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const searchMatched = brands.filter((brand) =>
      brand.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchData(searchMatched);
  };

  // @ Check handler
  const onCheckHandler = (title: string) => {
    const updatedData = (prev: typeof brands) =>
      prev.map((brand) =>
        brand.title.toLowerCase() === title.toLowerCase()
          ? { ...brand, check: !brand.check }
          : brand
      );
    setBrandData(updatedData);
    setSearchData(updatedData);

    queryHandler("brand", title);
  };

  const [params, setParams] = useState<{ [key: string]: string[] } | null>(
    null
  );

  useEffect(() => {
    const paramsObject: { [key: string]: string[] } | null = {};

    //  @ Get params from url and group values
    searchParams.forEach((value, key) => {
      let paramsObjectValue = paramsObject[key];

      if (paramsObject.hasOwnProperty(key)) {
        paramsObjectValue.includes(value)
          ? (paramsObject[key] = paramsObjectValue.filter(
              (currValue) => currValue !== value
            ))
          : (paramsObject[key] = [...paramsObjectValue, value]);
      } else {
        paramsObject[key] = [value];
      }

      // @ update the query state
      queryHandler(key, value);
      onCheckHandler(value);
    });

    setParams(paramsObject);
  }, []);

  // @ Set or update Params in url
  const onUrlParamsUpdate = (urlParameters: typeof params) => {
    if (!urlParameters || typeof urlParameters !== "object") {
      return;
    }

    const paramsArray = Object.entries(urlParameters);

    let searchString = paramsArray
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length
            ? `${key}=${encodeURIComponent(value.join("&"))}`
            : "";
        }
      })
      .join("&");

    navigate({ search: searchString });
  };

  // @ Query object
  const [query, setQuery] = useState<{ [key: string]: string[] }>({});

  const queryHandler = (propertyName: string, checkedPropertyValue: string) => {
    let updatedQuery = { ...query };

    let propertyValue = updatedQuery[propertyName];

    if (updatedQuery.hasOwnProperty(propertyName)) {
      propertyValue.includes(checkedPropertyValue)
        ? (updatedQuery[propertyName] = propertyValue.filter(
            (value) => value !== checkedPropertyValue
          ))
        : (updatedQuery[propertyName] = [
            ...propertyValue,
            checkedPropertyValue,
          ]);
    } else {
      updatedQuery[propertyName] = [checkedPropertyValue];
    }
    onUrlParamsUpdate(updatedQuery);
    setQuery(updatedQuery);
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
            {searchData.map((brand) => (
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
                key={brand.id}
                title={brand.title}
                control={
                  <Checkbox
                    onChange={() => onCheckHandler(brand.title)}
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
