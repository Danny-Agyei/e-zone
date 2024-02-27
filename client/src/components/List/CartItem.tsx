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
      <ListItem disablePadding sx={{ px: 2, pt: 2 }}>
        <ListItemText
          primary={
            <Stack direction="row" justifyContent="space-between" height="100%">
              <Box>
                <Stack direction="row" maxHeight={100}>
                  <Box
                    component="img"
                    width="50px"
                    height="50px"
                    src={image}
                    alt={name}
                  />
                  <Stack direction="column" justifyContent="space-between">
                    <Box px={2}>
                      <Typography
                        fontWeight={500}
                        fontSize={14}
                        variant="body2"
                        lineHeight={1}
                      >
                        {name}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontSize={13}
                        py={1}
                        color="#777"
                      >
                        {color}
                      </Typography>
                    </Box>
                    <Stack direction="row" alignItems="flex-end" px={2}>
                      <Stack direction="row" alignItems="center">
                        <Typography
                          fontSize={13}
                          variant="body2"
                          component="span"
                        >
                          Qty :{" "}
                        </Typography>
                        <Button
                          onClick={() => updateQty({ id, type: "dec" })}
                          sx={{
                            minWidth: 30,
                            p: 0,
                            fontWeight: 600,
                            color: "text.primary",
                            fontSize: 18,
                          }}
                        >
                          <AiOutlineMinusCircle />
                        </Button>
                        <Typography
                          px={0.5}
                          color="#777"
                          variant="body2"
                          component="span"
                        >
                          {qty}
                        </Typography>
                        <Button
                          onClick={() => updateQty({ id, type: "inc" })}
                          sx={{
                            p: 0,
                            fontWeight: 600,
                            color: "text.primary",
                            fontSize: 18,
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
              </Box>
              <Box>
                <Stack
                  direction="column"
                  justifyContent="space-between"
                  height="100%"
                  alignItems="flex-end"
                >
                  <Typography
                    lineHeight={1}
                    fontSize={14}
                    variant="body2"
                    fontWeight={500}
                  >
                    ${price}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={() => removeFromCart(id)}
                      sx={{
                        bgcolor: "#eaeaea",
                        p: 0.6,
                        color: "text.primary",
                        "&:hover": {
                          bgcolor: "#f9e9e9",
                          color: "red",
                        },
                      }}
                    >
                      <AiOutlineDelete fontSize={18} />
                    </IconButton>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          }
          sx={{ borderBottom: "1px solid #eaeaea", pb: 3 }}
        />
      </ListItem>
    </>
  );
}
