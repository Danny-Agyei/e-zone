import {
  Box,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { NavItem } from "../../components";
import { BsBag } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi2";

const Navbar = () => {
  return (
    <Box
      px={10}
      m="0 auto"
      py={2}
      borderBottom={1}
      borderColor="#eee"
      bgcolor="#fff"
      position="sticky"
      zIndex={999999999}
      top={0}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <List disablePadding sx={{ display: "flex", alignItems: "center" }}>
            <ListItemAvatar sx={{ lineHeight: 0 }}>
              <Link to="/">
                <Box
                  component="img"
                  width={160}
                  pr={2}
                  lineHeight={0}
                  src="http://localhost:1337/uploads/logo_removebg_preview_72c26cca5b.png"
                  alt="logo"
                />
              </Link>
            </ListItemAvatar>
            <NavItem
              title="Best Seller"
              linkTo="/shop/collection/best-seller"
            />
            <NavItem
              pl={4}
              title="Trending"
              linkTo="/shop/collection/trending"
            />
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
                  <Typography
                    variant="h3"
                    fontSize={13}
                    fontWeight={700}
                    pb={2}
                  >
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
                  <Typography
                    variant="h3"
                    fontSize={13}
                    fontWeight={700}
                    pb={2}
                  >
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
                  <Typography
                    variant="h3"
                    fontSize={13}
                    fontWeight={700}
                    pb={2}
                  >
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
            <Box position="relative">
              <IconButton sx={{ mr: 0.5 }}>
                <BsBag size={22} />
              </IconButton>
              <Typography
                component="span"
                variant="body2"
                fontSize={10}
                position="absolute"
                top={0}
                right={0}
                width={10}
                height={10}
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={0.7}
                borderRadius={75}
                bgcolor="text.secondary"
                color="#ffffff"
              >
                1
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Navbar;
