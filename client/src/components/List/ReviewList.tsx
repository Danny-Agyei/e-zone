import {
  Avatar,
  Box,
  Button,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { TiStarFullOutline } from "react-icons/ti";
import StarRating from "../Constant/StarRating";

export default function ReviewList() {
  return (
    <Box>
      {/* <Typography variant="h2" fontSize={16}>
        This product has no reviews. Share your thoughts with other customers.
      </Typography> */}
      <Box
        sx={{
          border: "1px solid #e9ecef",
          mt: 2,
          p: 2,
          maxHeight: 380,
          overflow: "auto",
        }}
      >
        <List sx={{ p: 0 }}>
          {Array.from({ length: 3 }, (_, indx) => (
            <Box key={indx}>
              <ListItem
                sx={{ py: 0 }}
                secondaryAction={
                  <Typography fontSize={13}>12/02/2024</Typography>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <RxAvatar size={60} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    "& span": { fontSize: 14, fontWeight: "500 !important" },
                  }}
                  primary="Anonymous"
                  // secondary={<StarRating />}
                />
              </ListItem>
              <ListItem sx={{ pt: 0 }}>
                <ListItemText
                  sx={{
                    borderBottom: "1px solid #e9ecef",
                    pt: 0,
                    pb: 3,
                    pl: 7,
                  }}
                  primary={
                    <Typography variant="body2" fontSize={13} color="#777">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veritatis perspiciatis ea, culpa.
                    </Typography>
                  }
                />
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>
      <Box pt={4}>
        <Typography variant="body2" pb={1} fontSize={18} fontWeight={500}>
          Leave a review.
        </Typography>
        <StarRating />
        <Stack pt={2} spacing={2} alignItems="center" direction="row">
          {1 > 0 && (
            <>
              <InputBase
                inputComponent="textarea"
                sx={{
                  border: "1px solid #e1e1e1",
                  p: "25px 20px",

                  width: "65%",
                }}
                placeholder="Enter a review"
              />
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "text.secondary",
                  color: "text.primary",
                  fontWeight: 500,
                  mt: 4,
                  width: "35%",
                  maxWidth: 250,
                  p: "12px 20px",
                  boxShadow: "none !important",
                  "&:hover": {
                    bgcolor: "#eea501 !important",
                  },
                }}
              >
                Write a review
              </Button>
            </>
          )}
          {1 > 2 && (
            <Box sx={{ py: 2, my: 2 }}>
              <Typography variant="body2" fontSize={18} fontWeight={500}>
                Write Your Own Reviews.
              </Typography>
              <Typography variant="body2" fontSize={14} color="#777">
                Only registered users can write reviews. Please{" "}
                <Link to="/account/login">
                  <Typography
                    component="span"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "underline",
                      fontWeight: 500,
                    }}
                  >
                    login
                  </Typography>{" "}
                </Link>{" "}
                or{" "}
                <Link to="/account/login">
                  <Typography
                    component="span"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "underline",
                      fontWeight: 500,
                    }}
                  >
                    register
                  </Typography>
                </Link>
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
