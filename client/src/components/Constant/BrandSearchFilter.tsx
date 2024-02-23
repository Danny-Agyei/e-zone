import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { BiSearch } from "react-icons/bi";

import SideBarItem from "../List/SideBarItem";

export default function BrandSearchFilter() {
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

  return (
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
  );
}
