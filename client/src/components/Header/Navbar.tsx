import {
  Box,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { AccountDropdown, FilterSelector, NavItem } from "../../components";
import { IoHeartOutline } from "react-icons/io5";

import { GiShoppingBag } from "react-icons/gi";

import { BiSearch } from "react-icons/bi";

import logo from "../../logo.png";
import store from "../../lib/zustand/store";
import CartDrawer from "./CartDrawer";

import { useQueryParams } from "../../Utilities";

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

const Navbar = () => {
  const { updateQuery } = useQueryParams();

  const shopCart = store.use.cart();
  const [openCart, setOpenCart] = useState(false);
  const [term, setTerm] = useState("");

  const toggleCartDrawer = () => setOpenCart(!openCart);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setTerm(inputText);
  };

  const handleSearch = (event: FormEvent) => {
    event?.preventDefault();

    if (!term.length) {
      return;
    }
    localStorage.removeItem("queryParams");
    updateQuery("toggle", "q", term, undefined);
    setTerm("");
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        borderBottom: 1,
        borderColor: "#eaeaea",
        bgcolor: "text.primary",
      }}
    >
      <Box px={10} m="0 auto" py={2}>
        <CartDrawer openCart={openCart} toggleCartDrawer={toggleCartDrawer} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <a href="/">
              <Box
                component="img"
                width={120}
                lineHeight={0}
                src={logo}
                alt="logo"
              />
            </a>
          </Box>
          <Box
            sx={{
              width: "45%",
              maxWidth: 550,
              display: "flex",
              alignItems: "center",
              height: 45,
              px: 0.5,
              border: "1px solid #eaeaea",
              borderRadius: 9999,
              bgcolor: "#fff",
              position: "relative",
              minWidth: 200,
            }}
          >
            <FilterSelector filterData={categories} />
            <form
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
              onSubmit={handleSearch}
            >
              <InputBase
                onChange={handleChange}
                value={term}
                placeholder="Search product"
                sx={{
                  p: 1,
                  fontSize: 14,
                  width: "100%",
                  color: "#777",
                  height: "100%",
                }}
              />
            </form>
            <Box
              sx={{
                position: "absolute",
                right: 2,
                zIndex: 999,
              }}
            >
              <IconButton
                onClick={handleSearch}
                sx={{
                  bgcolor: "text.secondary",
                  height: 38,
                  width: 38,
                  "&:hover": {
                    opacity: 0.85,
                    bgcolor: "text.secondary",
                  },
                }}
              >
                <BiSearch color="#1c1b1b" size={20} />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={4}
            >
              <Box pt={0.7}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={0}
                >
                  <IoHeartOutline size={40} color="#fff" />
                  <Typography variant="body2" pl={1} fontSize={13} color="#fff">
                    Favourite <br />
                    Wishlist
                  </Typography>
                </Stack>
              </Box>
              <Box pt={0.7}>
                <AccountDropdown />
              </Box>
              <Box
                position="relative"
                onClick={toggleCartDrawer}
                sx={{ cursor: "pointer" }}
              >
                <IconButton sx={{ mr: 0.5, p: 0 }}>
                  <GiShoppingBag size={35} color="#ffb100" />
                </IconButton>
                <Typography
                  component="span"
                  variant="body2"
                  fontSize={12}
                  fontWeight={500}
                  position="absolute"
                  top={-8}
                  left={18}
                  width={15}
                  height={15}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={0.6}
                  borderRadius={75}
                  bgcolor="#fff"
                  color="text.primary"
                >
                  {shopCart.length}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Box
        px={0}
        py={2.5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#232f3e",
        }}
      >
        <List disablePadding sx={{ display: "flex", alignItems: "center" }}>
          <NavItem
            title="Electronics"
            linkTo="/shop/collection/electronics"
            hasSubList={true}
          >
            <Grid item xs={3}>
              <Box>
                <Typography fontSize={13} fontWeight={700} pb={2}>
                  COMPUTERS
                </Typography>
                <List disablePadding>
                  <ListItemText
                    sx={{ pb: 0.5 }}
                    primary={
                      <a href="/shop/collection?q=desktop">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Desktops
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5 }}
                    primary={
                      <a href="/shop/collection?q=laptop">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Laptops
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=computer-accessories">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Computer Accessories
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=computer">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Shop All
                        </Typography>
                      </a>
                    }
                  />
                </List>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Typography variant="h3" fontSize={13} fontWeight={700} pb={2}>
                  MOBILE
                </Typography>
                <List disablePadding>
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=tablet">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Tablets
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=cell-phone">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Cell Phones
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=smart-watch">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Smart Watches
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=mobile-accessories">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Mobile Accessories
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=mobile">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Shop All
                        </Typography>
                      </a>
                    }
                  />
                </List>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Typography variant="h3" fontSize={13} fontWeight={700} pb={2}>
                  AUDIO
                </Typography>
                <List disablePadding>
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=headphones">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Headphones
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=speakers">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Speakers
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=ear-buds">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Ear Buds
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=audio">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Shop All
                        </Typography>
                      </a>
                    }
                  />
                </List>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Typography variant="h3" fontSize={13} fontWeight={700} pb={2}>
                  TV, CAMERA & MORE
                </Typography>
                <List disablePadding>
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=tv">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Tv & video
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=smart-home">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Smart Home & Security
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=video-games">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Video Games & Consoles
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection/mobile-accessories">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Mobile Accessories
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=video">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Shop All
                        </Typography>
                      </a>
                    }
                  />
                </List>
              </Box>
            </Grid>
          </NavItem>
          <NavItem
            pl={4}
            title="Apparel"
            linkTo="/shop/collection/apparel"
            hasSubList={true}
          >
            <Grid item xs={3}>
              <Box>
                <Typography fontSize={13} fontWeight={700} pb={2}>
                  MEN
                </Typography>
                <List disablePadding>
                  <ListItemText
                    sx={{ pb: 0.5 }}
                    primary={
                      <a href="/shop/collection?q=men-jackets-coats">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Jackets & Coats
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5 }}
                    primary={
                      <a href="/shop/collection?q=men-tshirt-tanks">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          T-shirt & Tanks
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=men-sweaters-cardigans">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Sweaters & Cardigans
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=men-tops-shirts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Tops & Shirts
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=men-hoodies-sweatshirts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Hoodies & Sweatshirts
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=men-joggers-pants">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Joggers & Pants
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=men-underwear">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Underwear
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=men-shorts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Shorts
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=men-wear">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Shop All
                        </Typography>
                      </a>
                    }
                  />
                </List>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Typography fontSize={13} fontWeight={700} pb={2}>
                  WOMEN
                </Typography>
                <List disablePadding>
                  <ListItemText
                    sx={{ pb: 0.5 }}
                    primary={
                      <a href="/shop/collection?q=womens-jackets-coats">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Jackets & Coats
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5 }}
                    primary={
                      <a href="/shop/collection?q=womens-tshirt-tanks">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          T-shirt & Tanks
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=womens-sweaters-cardigans">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Sweaters & Cardigans
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=womens-tops-shirts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Tops & Shirts
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=womens-hoodies-sweatshirts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Hoodies & Sweatshirts
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 190 }}
                    primary={
                      <a href="/shop/collection?q=womens-joggers-pants-leggings">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Joggers, Pants & Leggings
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=women-dresses-jumpsuits">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Dresses & Jumpsuits
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=women-shorts-skirts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Shorts & Skirts
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=women-underwear">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Underwear
                        </Typography>
                      </a>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <a href="/shop/collection?q=women-wear">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={14}
                        >
                          Shop All
                        </Typography>
                      </a>
                    }
                  />
                </List>
              </Box>
            </Grid>
          </NavItem>
          <NavItem
            pl={4}
            title="Best Seller"
            linkTo="/shop/collection/best seller"
          />
          <NavItem pl={4} title="Trending" linkTo="/shop/collection/trending" />
          <NavItem
            pl={4}
            title="New Arrival"
            linkTo="/shop/collection/new arrival"
          />
        </List>
      </Box>
    </Box>
  );
};

export default Navbar;
