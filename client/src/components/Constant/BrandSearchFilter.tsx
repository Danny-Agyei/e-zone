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
      <SideBarItem
        listData={electronicBrands}
        title="Brands"
        hasCheckList={true}
        hasSearchBar={true}
        palceholderText="Search by brand"
      />
    </Box>
  );
}
