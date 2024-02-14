import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { TiStarFullOutline } from "react-icons/ti";
import StarRating from "../Constant/StarRating";

export default function ReviewList() {
  return (
    <Box>
      <Typography variant="h2" fontSize={16}>
        This product has no reviews. Share your thoughts with other customers.
      </Typography>
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
            <>
              <ListItem
                sx={{ py: 0 }}
                secondaryAction={
                  <Typography fontSize={14}>12/02/2024</Typography>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <RxAvatar size={60} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ "& span": { fontWeight: "600 !important" } }}
                  primary="Anonymous"
                  secondary={<StarRating />}
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
                    <Typography variant="body2" fontSize={14} color="#666">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veritatis perspiciatis ea, culpa.
                    </Typography>
                  }
                />
              </ListItem>
            </>
          ))}
        </List>
      </Box>
      <Button
        variant="contained"
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "text.secondary",
          color: "text.primary",
          fontWeight: 600,
          mt: 4,
          width: "100%",
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
      <Box sx={{ border: "1px solid #eee", py: 2, my: 2 }}>
        <Typography variant="h4" fontSize={18} fontWeight={600}>
          Write Your Own Reviews.
        </Typography>
        <Typography variant="body2" fontSize={14} color="#666">
          Only registered users can write reviews. Please{" "}
          <Link to="/account/login">
            <Typography
              component="span"
              sx={{ textDecoration: "underline", fontWeight: 600 }}
            >
              login
            </Typography>{" "}
          </Link>{" "}
          or{" "}
          <Link to="/account/login">
            <Typography
              component="span"
              sx={{ textDecoration: "underline", fontWeight: 600 }}
            >
              register
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
