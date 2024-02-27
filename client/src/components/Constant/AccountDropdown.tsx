import {
  Box,
  Button,
  FormControl,
  InputBase,
  List,
  ListItemText,
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
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

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

export default function AccountDropdown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMouseOver = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMouseOut = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      component="span"
      sx={{
        position: "relative",
        bgcolor: "transparent",
        border: "none",
        p: 0,
        textTransform: "capitalize",
        textAlign: "left",
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Button
        sx={{
          color: "text.primary",
          p: 0,
          textTransform: "capitalize",
          textAlign: "left",
          "&:hover": {
            bgcolor: "transparent",
            // opacity: 0.6,
            "&:before": {
              content: '"log in to my account !!!"',
              position: "absolute",
              color: "#fff",
              cursor: "pointer",
              height: 100,
              width: "max-content",
              px: 1.2,
              top: 0,
              left: 0,
              opacity: 0,
              zIndex: 995,
            },
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <FaRegUser size={32} color="#fff" />
          <Typography variant="body2" pl={1} fontSize={13} color="#fff">
            Login <br />
            My Account
          </Typography>
          <MdKeyboardArrowDown size={25} color="#fff" />
        </Stack>
      </Button>
      <List
        disablePadding
        sx={{
          bgcolor: "#fff",
          borderRadius: 1,
          position: "absolute",
          top: open ? 60 : 80,
          visibility: open ? "visible" : "hidden",
          opacity: open ? 1 : 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          width: 180,
          height: 140,
          boxShadow: "0 0 5px #e1e1e1",
          transition: "all .25s ease-in-out",
          "& .MuiListItemText-root:last-child": {
            borderBottom: "0 !important",
          },
        }}
      >
        {linkList.map((link, indx) => (
          <ListItemText
            key={indx}
            sx={{ borderBottom: "1px solid #eaeaea", p: 0 }}
            primary={
              <Link to="/" style={{ padding: "10px 20px", display: "block" }}>
                <Typography fontSize={13} color="#text.primary">
                  {link.title}
                </Typography>
              </Link>
            }
          />
        ))}
      </List>
    </Box>
  );
}
