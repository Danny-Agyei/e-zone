import { Box } from "@mui/material";
import SideBarItem from "./SideBarItem";

const categories = [
  "Electronics",
  "Computers & Accessories",
  "Computers & Tablets",
  "2 in 1 Laptop Computers",
];

export default function ShopCategoryList() {
  return (
    <Box pt={4}>
      <SideBarItem
        hasSearchBar={false}
        title="Categories"
        listData={categories}
        hasCheckList={false}
      />
    </Box>
  );
}
