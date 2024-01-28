import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
//   import { CartItemProps } from "../../types";
//   import cartStore from "../../lib/zustand/store";

export default function CartItem(props: { item: any }) {
  //   const updateQty = cartStore.use.updateQty();
  //   const removeCartItem = cartStore.use.removeFromCart();

  const { id, qty, name, price, image, stock, color } = props.item;

  // @Quantity update
  //   const onQtyIncrease = () => qty < stock && updateQty(id, qty + 1);
  //   const onQtyDecrease = () => qty > 1 && updateQty(id, qty - 1);

  return (
    <>
      <ListItem disablePadding sx={{ px: 2, py: 1.5 }}>
        <ListItemText
          primary={
            <Grid container>
              <Grid item xs={10}>
                <Stack direction="row" maxHeight={100}>
                  <img
                    width="80px"
                    height="80px"
                    src={`${process.env.REACT_APP_BASE_URL}${image}`}
                    alt={name}
                  />
                  <Stack direction="column" justifyContent="space-between">
                    <Box px={2}>
                      <Typography
                        fontWeight={600}
                        fontSize={16}
                        variant="h6"
                        lineHeight={1}
                        pb={1}
                      >
                        {name}
                      </Typography>
                      <Typography variant="body2">{color}</Typography>
                    </Box>
                    <Stack direction="row" alignItems="flex-end" px={2}>
                      <Stack direction="row" alignItems="center">
                        <Typography variant="body2" component="span">
                          Quantity
                        </Typography>
                        <Button
                          onClick={() => alert(1)}
                          sx={{
                            minWidth: 30,
                            p: 0,
                            fontWeight: 600,
                            color: "text.primary",
                            fontSize: 16,
                          }}
                        >
                          -
                        </Button>
                        <Typography variant="body2" component="span">
                          {qty}
                        </Typography>
                        <Button
                          onClick={() => alert(1)}
                          sx={{
                            p: 0,
                            fontWeight: 600,
                            color: "text.primary",
                            fontSize: 16,
                            minWidth: 30,
                          }}
                          variant="text"
                        >
                          +
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack
                  direction="column"
                  justifyContent="space-between"
                  height="100%"
                  alignItems="flex-end"
                >
                  <Typography lineHeight={1} variant="body1" fontWeight={600}>
                    ${price}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={() => alert(id)}
                      sx={{
                        fontSize: 45,
                        width: "20px",
                        height: "20px",
                        color: "#bbb",
                      }}
                    >
                      &times;
                    </IconButton>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          }
        />
      </ListItem>
      <Divider sx={{ m: 0, p: 0 }} />
    </>
  );
}
