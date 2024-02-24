import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, InputBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MdKeyboardArrowDown } from "react-icons/md";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 215,
      zIndex: 9999,
    },
  },
};

const categories = [
  "All",
  "Electronics",
  "Fashion & jewellery",
  "Computer & Accessories",
  "Mobile & Accessories",
  "Headphones",
  "Smart-Watches",
  "tv-camera-more",
];

export default function CustomSelect() {
  const theme = useTheme();
  const [categoryName, setCategoryName] = React.useState("All");

  const handleChange = (event: SelectChangeEvent<typeof categoryName>) => {
    const {
      target: { value },
    } = event;
    setCategoryName(value);
  };

  return (
    <div
      id="custom-select"
      style={{
        position: "relative",
      }}
    >
      <FormControl
        sx={{
          m: 0,
          minWidth: 20,
          border: 0,
          pl: 1,
          pr: 0.5,
          zIndex: 996,
          "& fieldset": { borderColor: "transparent" },
        }}
      >
        <Select
          defaultValue="All"
          value={categoryName}
          onChange={handleChange}
          input={<InputBase />}
          MenuProps={MenuProps}
          sx={{
            fontWeight: 600,
            fontSize: 14,
            // position: "relative",
          }}
        >
          {categories.map((category) => (
            <MenuItem
              key={category}
              value={category}
              sx={{
                fontSize: 14,
                position: "relative",
                border: "1px solid #eee",
                "&:hover": { bgcolor: "#e9ecef" },
              }}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <MdKeyboardArrowDown
        fontSize={22}
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translate(0px, -50%)",
          zIndex: 995,
        }}
      />
    </div>
  );
}
