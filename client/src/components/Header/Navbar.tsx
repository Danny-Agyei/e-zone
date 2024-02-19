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
import { useState } from "react";
import { Link } from "react-router-dom";
import { CustomSelect, NavItem } from "../../components";
import { BsBag } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi2";
import { BiSearch } from "react-icons/bi";

import logo from "../../logo.png";
import store from "../../lib/zustand/store";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const shopCart = store.use.cart();
  const [openCart, setOpenCart] = useState(false);

  const toggleCartDrawer = () => setOpenCart(!openCart);
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        borderBottom: 1,
        borderColor: "#f2ecec",
      }}
    >
      <Box px={10} m="0 auto" py={2} bgcolor="#eeeee9">
        <CartDrawer openCart={openCart} toggleCartDrawer={toggleCartDrawer} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Link to="/">
              <Box
                component="img"
                width={120}
                lineHeight={0}
                src={logo}
                alt="logo"
              />
            </Link>
          </Box>
          <Box sx={{ width: "40%", position: "relative", height: 50 }}>
            <InputBase
              fullWidth
              // placeholder="Search product"
              sx={{
                border: "1px solid #aaa",
                p: 1,
                pl: 4,
                borderRadius: 9999,
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                height: 50,
              }}
            />
            <IconButton
              sx={{
                bgcolor: "text.secondary",
                position: "absolute",
                right: 4,
                top: 4,
                "&:hover": {
                  opacity: 0.85,
                  bgcolor: "text.secondary",
                },
              }}
            >
              <BiSearch color="#fff" />
            </IconButton>
            <CustomSelect />
          </Box>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={0}
            >
              <Box pr={1} pt={0.7}>
                <Link to="/account/login">
                  <HiOutlineUser size={25} color="#666" />
                </Link>
              </Box>
              <Box
                position="relative"
                onClick={toggleCartDrawer}
                sx={{ cursor: "pointer" }}
              >
                <IconButton sx={{ mr: 0.5 }}>
                  <BsBag size={22} />
                </IconButton>
                <Typography
                  component="span"
                  variant="body2"
                  fontSize={10}
                  fontWeight={600}
                  position="absolute"
                  top={0}
                  right={0}
                  width={10}
                  height={10}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={0.6}
                  borderRadius={75}
                  bgcolor="black"
                  color="#ffffff"
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
          bgcolor: "#fff",
        }}
      >
        <List disablePadding sx={{ display: "flex", alignItems: "center" }}>
          <NavItem title="Best Seller" linkTo="/shop/collection/best-seller" />
          <NavItem pl={4} title="Trending" linkTo="/shop/collection/trending" />
          <NavItem
            pl={4}
            title="New Arrival"
            linkTo="/shop/collection/new-arrival"
          />
          <NavItem
            pl={4}
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
                      <Link to="/shop/collection?q=desktop">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Desktops
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5 }}
                    primary={
                      <Link to="/shop/collection?q=laptop">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Laptops
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=computer-accessories">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Computer Accessories
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=computer">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Shop All
                        </Typography>
                      </Link>
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
                      <Link to="/shop/collection?q=tablet">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Tablets
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=cell-phone">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Cell Phones
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=smart-watch">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Smart Watches
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=mobile-accessories">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Mobile Accessories
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=mobile">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Shop All
                        </Typography>
                      </Link>
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
                      <Link to="/shop/collection?q=headphones">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Headphones
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=speakers">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Speakers
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=ear-buds">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Ear Buds
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=audio">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Shop All
                        </Typography>
                      </Link>
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
                      <Link to="/shop/collection?q=tv">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Tv & video
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=smart-home">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Smart Home & Security
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=video-games">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Video Games & Consoles
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection/mobile-accessories">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Mobile Accessories
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=video">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Shop All
                        </Typography>
                      </Link>
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
                      <Link to="/shop/collection?q=men-jackets-coats">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Jackets & Coats
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5 }}
                    primary={
                      <Link to="/shop/collection?q=men-tshirt-tanks">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          T-shirt & Tanks
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=men-sweaters-cardigans">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Sweaters & Cardigans
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=men-tops-shirts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Tops & Shirts
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=men-hoodies-sweatshirts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Hoodies & Sweatshirts
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=men-joggers-pants">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Joggers & Pants
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=men-underwear">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Underwear
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=men-shorts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Shorts
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=men-wear">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Shop All
                        </Typography>
                      </Link>
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
                      <Link to="/shop/collection?q=womens-jackets-coats">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": { opacity: 0.6 },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Jackets & Coats
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5 }}
                    primary={
                      <Link to="/shop/collection?q=womens-tshirt-tanks">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          T-shirt & Tanks
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=womens-sweaters-cardigans">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Sweaters & Cardigans
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=womens-tops-shirts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Tops & Shirts
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=womens-hoodies-sweatshirts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Hoodies & Sweatshirts
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 190 }}
                    primary={
                      <Link to="/shop/collection?q=womens-joggers-pants-leggings">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Joggers, Pants & Leggings
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=women-dresses-jumpsuits">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Dresses & Jumpsuits
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=women-shorts-skirts">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Shorts & Skirts
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=women-underwear">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Underwear
                        </Typography>
                      </Link>
                    }
                  />
                  <ListItemText
                    sx={{ pb: 0.5, maxWidth: 170 }}
                    primary={
                      <Link to="/shop/collection?q=women-wear">
                        <Typography
                          sx={{
                            transition: "opacity .25s ease-in-out;",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          variant="body2"
                          fontSize={16}
                        >
                          Shop All
                        </Typography>
                      </Link>
                    }
                  />
                </List>
              </Box>
            </Grid>
          </NavItem>
        </List>
      </Box>
    </Box>
  );
};

export default Navbar;
