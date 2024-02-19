import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, InputBase } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MdKeyboardArrowDown } from "react-icons/md";

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

function getStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightBold
        : theme.typography.fontWeightBold,
  };
}

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
        position: "absolute",
        left: 15,
        top: "50%",
        transform: "translate(0, -50%)",
      }}
    >
      <FormControl
        sx={{
          m: 0,
          minWidth: 20,
          border: 0,
          pr: 0.5,
          "& fieldset": { borderColor: "transparent" },
        }}
      >
        <Select
          defaultValue="All"
          value={personName}
          onChange={handleChange}
          input={<InputBase />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <MdKeyboardArrowDown fontSize={22} />
    </Box>
  );
}
