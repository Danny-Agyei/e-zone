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
import {
  AiOutlineDelete,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";

//   import { CartItemProps } from "../../types";
import store from "../../lib/zustand/store";

export default function CartItem(props: { item: any }) {
  const updateQty = store.use.updateQty();
  const removeFromCart = store.use.removeFromCart();

  const { id, qty, name, price, image, stock, color } = props.item;

  return (
    <>
      <ListItem disablePadding sx={{ px: 2, py: 2 }}>
        <ListItemText
          primary={
            <Grid container>
              <Grid item xs={10}>
                <Stack direction="row" maxHeight={100}>
                  <img width="80px" height="80px" src={image} alt={name} />
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
                          Qty :{" "}
                        </Typography>
                        <Button
                          onClick={() => updateQty({ id, type: "dec" })}
                          sx={{
                            minWidth: 30,
                            p: 0,
                            fontWeight: 600,
                            color: "text.primary",
                            fontSize: 22,
                          }}
                        >
                          <AiOutlineMinusCircle />
                        </Button>
                        <Typography px={0.5} variant="body2" component="span">
                          {qty}
                        </Typography>
                        <Button
                          onClick={() => updateQty({ id, type: "inc" })}
                          sx={{
                            p: 0,
                            fontWeight: 600,
                            color: "text.primary",
                            fontSize: 22,
                            minWidth: 30,
                          }}
                          variant="text"
                        >
                          <AiOutlinePlusCircle />
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
                      onClick={() => removeFromCart(id)}
                      sx={{
                        bgcolor: "#ececec",
                        color: "text.primary",
                        "&:hover": {
                          bgcolor: "#f9e9e9",
                          color: "red",
                        },
                      }}
                    >
                      <AiOutlineDelete fontSize={20} />
                    </IconButton>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          }
        />
      </ListItem>
      <Divider sx={{ m: 0, p: 0, borderColor: "#eee" }} />
    </>
  );
}
