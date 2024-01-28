import {
  Box,
  Button,
  List,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";

import { CartItem } from "../../components";
// import useStore from "../../lib/zustand/store";
import { CartItemType } from "../../types";

export default function CartDrawer(props: {
  toggleCartDrawer: () => void;
  openCart: boolean;
}) {
  const { toggleCartDrawer, openCart } = props;
  const cartList: any[] = []; //CartItemProps[] = useStore.use.cart();

  //@subtotal calculation
  const subtotal = cartList.reduce(
    (prev: any, curr: any) => prev + curr.price * curr.qty,
    0
  );

  //@stripe
  const lineItems = cartList.map((item: any) => {
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
    <Box>
      <SwipeableDrawer
        anchor="right"
        open={openCart}
        onClose={toggleCartDrawer}
        onOpen={toggleCartDrawer}
      >
        <Box
          sx={{
            py: 3,
            minWidth: 350,
            maxWidth: 400,
            maxHeight: 350,
            overflow: "auto",
          }}
        >
          {cartList.length > 0 ? (
            <List>
              {cartList.map((item: any) => (
                <CartItem item={item} key={item.id} />
              ))}
            </List>
          ) : (
            <Box
              sx={{ display: "flex" }}
              pt={15}
              component="p"
              justifyContent="center"
              alignContent="center"
            >
              Your cart is empty.
            </Box>
          )}
        </Box>

        <Box
          position="absolute"
          bottom={40}
          pl={0}
          pr={2}
          width={320}
          right={0}
        >
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="h3" fontWeight={600} fontSize={18}>
              Subtotal
            </Typography>
            <Typography fontWeight={600} variant="body1">
              ${subtotal.toFixed(2)}
            </Typography>
          </Stack>
          <Button
            onClick={onCheckoutHandler}
            fullWidth
            sx={{
              bgcolor: "text.primary",
              py: 2,
              "&:hover": {
                opacity: 0.9,
                bgcolor: "text.primary",
              },
            }}
            variant="contained"
          >
            Check out
          </Button>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
