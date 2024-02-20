import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, InputBase } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MdKeyboardArrowDown } from "react-icons/md";
import zIndex from "@mui/material/styles/zIndex";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
      zIndex: 9999,
    },
  },
};

const names = [
  "All",
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function CustomSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState("All");

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
  };

  return (
    <Box
      sx={{
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
          value={personName}
          onChange={handleChange}
          input={<InputBase />}
          MenuProps={MenuProps}
          sx={{
            fontWeight: 600,
            fontSize: 14,
            // position: "relative",
          }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              sx={{
                fontSize: 14,
                position: "relative",
                "&:hover": { bgcolor: "#e9ecef" },
              }}
            >
              {name}
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
    </Box>
  );
}
