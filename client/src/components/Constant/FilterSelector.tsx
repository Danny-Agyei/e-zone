import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { InputBase } from "@mui/material";
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

export default function FilterSelector({
  filterData,
  selectColor,
}: {
  selectColor?: string;
  filterData: string[];
}) {
  const theme = useTheme();
  const [filterName, setFilterName] = React.useState(filterData[0]);

  const handleChange = (event: SelectChangeEvent<typeof filterName>) => {
    const {
      target: { value },
    } = event;
    setFilterName(value);
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
          defaultValue={filterData[0]}
          value={filterName}
          onChange={handleChange}
          input={<InputBase />}
          MenuProps={MenuProps}
          sx={{
            fontWeight: 500,
            fontSize: 14,
            "& .MuiSelect-select": {
              color: selectColor ? selectColor : "#1c1b1b",
            },
            // position: "relative",
          }}
        >
          {filterData.map((data) => (
            <MenuItem
              key={data}
              value={data}
              sx={{
                fontSize: 14,
                position: "relative",
                border: "1px solid #eee",
                "&:hover": { bgcolor: "#e9ecef" },
              }}
            >
              {data}
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
