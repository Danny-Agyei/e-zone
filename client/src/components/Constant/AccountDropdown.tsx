import {
  Box,
  FormControl,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi2";

const linkList = [
  {
    title: "Sign in",
    url: "/account/login",
    iconUrl:
      "https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/sign-in.svg",
  },
  {
    title: "Create an Account",
    url: "/account/signup",
    iconUrl:
      "https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/create-account.svg",
  },
  {
    title: "Your Orders",
    url: "/orders/history",
    iconUrl:
      "https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/my-order.svg",
  },
];

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

export default function AccountDropdown() {
  const theme = useTheme();
  const [linkName, setLinkName] = React.useState("All");

  const handleChange = (event: SelectChangeEvent<typeof linkName>) => {
    const {
      target: { value },
    } = event;
    setLinkName(value);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <HiOutlineUser size={22} color="#13131a" />
        <Typography
          component="span"
          variant="body2"
          fontSize={16}
          fontWeight={600}
        >
          Account
        </Typography>
        <MdKeyboardArrowDown size={25} color="#13131a" />
      </Stack>
      {/* <Select
          defaultValue="All"
          value={linkName}
          onChange={handleChange}
          //   input={<InputBase />}
          //   MenuProps={MenuProps}
          sx={{
            fontWeight: 600,
            fontSize: 14,
            // position: "relative",
          }}
        > */}
      {linkList.map((link, indx) => (
        <Menu open={false} key={indx}>
          <MenuItem
            key={link.title}
            sx={{
              fontSize: 14,
              position: "relative",
              border: "1px solid #eee",
              "&:hover": { bgcolor: "#e9ecef" },
            }}
          >
            <Box
              component="img"
              width={20}
              height={20}
              src={link.iconUrl}
              alt={link.title}
            />
            <Typography component="span">{link.title}</Typography>
          </MenuItem>
        </Menu>
      ))}
      {/* </Select> */}
    </Box>
  );
}
