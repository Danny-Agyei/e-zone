import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";

import { CartItem } from "../../components";
import store from "../../lib/zustand/store";
import { CartItemType } from "../../types";
import { Link } from "react-router-dom";

export default function CartDrawer(props: {
  toggleCartDrawer: () => void;
  openCart: boolean;
}) {
  const { toggleCartDrawer, openCart } = props;
  const shoppingCart: CartItemType[] = store.use.cart();

  //@subtotal calculation
  const subtotal = shoppingCart.reduce(
    (prev: any, curr: any) => prev + curr.price * curr.qty,
    0
  );

  //@stripe
  const lineItems = shoppingCart.map((item: any) => {
    if (item.name === "UO - Shelf Divider") {
      return {
        price: "price_1OWLB8DnQNiDZWQ7tPGe1nyg",
        quantity: item.qty,
      };
    }
    return {
      price: "price_1OWLBzDnQNiDZWQ7icmQP3un",
      quantity: item.qty,
    };
  });

  const onCheckoutHandler = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/stripe/create`,
      {
        method: "POST",
        body: JSON.stringify(lineItems),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    window.location.assign(data.url);
    console.log(data);
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={openCart}
      onClose={toggleCartDrawer}
      onOpen={toggleCartDrawer}
      sx={{
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          width: "100%",
          minWidth: 500,
          maxWidth: 500,
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 2,
            py: 2,
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <Typography variant="body2" fontSize={18} fontWeight={600}>
            Your Cart
          </Typography>
          <IconButton
            onClick={toggleCartDrawer}
            sx={{
              bgcolor: "text.primary",
              "&:hover": { bgcolor: "text.primary", opacity: 0.8 },
            }}
          >
            <IoCloseOutline fontWeight={600} fontSize={21} color="#fff" />
          </IconButton>
        </Stack>
        <Divider
          variant="fullWidth"
          sx={{
            borderColor: "#eee",
          }}
        />
        {shoppingCart.length > 0 ? (
          <Box sx={{ maxHeight: 500, overflow: "auto" }}>
            <List sx={{ "&:last-child hr": { display: "none" } }}>
              {shoppingCart.map((item: any) => (
                <CartItem item={item} key={item.id} />
              ))}
            </List>
          </Box>
        ) : (
          <>
            <Box></Box>
            <Box
              sx={{
                textAlign: "center",
                pt: 8,
              }}
            >
              <Box
                component="img"
                width={200}
                src="http://localhost:1337/uploads/your_shopping_cart_is_empty_362dd5e5f8.png"
                alt="empty_basket"
              />
              <Typography variant="body2" fontWeight={600} fontSize={22}>
                Your shopping cart is empty
              </Typography>
              <Typography variant="body2" py={2}>
                Lets change that!
              </Typography>
              <Button
                onClick={onCheckoutHandler}
                fullWidth
                sx={{
                  bgcolor: "text.secondary",
                  color: "text.primary",
                  boxShadow: "none",
                  maxWidth: 160,
                  fontWeight: 600,
                  fontSize: 14,
                  py: 1.4,
                  "&:hover": {
                    opacity: 0.9,
                    boxShadow: "none",
                    bgcolor: "text.secondary",
                  },
                }}
                variant="contained"
              >
                Go to Shop
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          m: "0 auto",
          maxWidth: 460,
        }}
      >
        <Divider
          variant="fullWidth"
          sx={{
            borderColor: "#e5e5e5",
            mb: 2,
          }}
        />
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h3" fontWeight={600} fontSize={18}>
            Subtotal [{shoppingCart.length}{" "}
            {shoppingCart.length > 1 ? "items" : "item"}] :
          </Typography>
          <Typography fontWeight={600} variant="body1">
            ${subtotal.toFixed(2)}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={4}>
          <Link to="/cart" style={{ display: "block", width: "100%" }}>
            <Button
              onClick={onCheckoutHandler}
              fullWidth
              sx={{
                bgcolor: "#e1e1e1",
                color: "text.primary",
                fontWeight: 600,
                fontSize: 14,
                py: 1.4,
                boxShadow: "none",
                "&:hover": {
                  opacity: 0.9,
                  bgcolor: "#e1e1e1",
                  boxShadow: "none",
                },
              }}
              variant="contained"
            >
              view cart
            </Button>
          </Link>
          <Button
            onClick={onCheckoutHandler}
            fullWidth
            sx={{
              bgcolor: "text.secondary",
              color: "text.primary",
              boxShadow: "none",
              fontWeight: 600,
              fontSize: 14,
              py: 1.4,
              "&:hover": {
                opacity: 0.9,
                boxShadow: "none",
                bgcolor: "text.secondary",
              },
            }}
            variant="contained"
          >
            Check out
          </Button>
        </Stack>
      </Box>
    </SwipeableDrawer>
  );
}
