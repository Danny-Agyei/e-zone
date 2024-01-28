import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box px={10} mt={8} py={4} bgcolor="#f2f2f2">
      <Grid container>
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <Typography fontSize={18} variant="h6" fontWeight={600}>
            Categories
          </Typography>
          <List>
            <ListItemText
              sx={{ mb: 1 }}
              primary={<Link to="/">Electronics</Link>}
            />
            <ListItemText
              sx={{ mb: 1 }}
              primary={<Link to="/">Computers</Link>}
            />
            <ListItemText sx={{ mb: 1 }} primary={<Link to="/">Audio</Link>} />
            <ListItemText
              sx={{ mb: 1 }}
              primary={<Link to="/">Men Fashion</Link>}
            />
            <ListItemText
              sx={{ mb: 1 }}
              primary={<Link to="/">Women Fashion</Link>}
            />
          </List>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={3}>
          <Typography fontSize={18} variant="h6" fontWeight={600}>
            Policy
          </Typography>
          <List>
            <ListItemText
              sx={{ mb: 1 }}
              primary={<Link to="/">Terms of Usage</Link>}
            />
            <ListItemText
              sx={{ mb: 1 }}
              primary={<Link to="/">Privacy Policy</Link>}
            />
            <ListItemText
              sx={{ mb: 1 }}
              primary={<Link to="/">Return Policy</Link>}
            />
          </List>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={3}>
          <Typography fontSize={18} variant="h6" fontWeight={600}>
            My Account
          </Typography>
          <List>
            <ListItemText
              sx={{ mb: 1 }}
              primary={<Link to="/">Orders History</Link>}
            />
            <ListItemText
              sx={{ mb: 1 }}
              primary={<Link to="/">Shopping Cart</Link>}
            />
            <ListItemText
              sx={{ mb: 1 }}
              primary={<Link to="/">Account</Link>}
            />
          </List>
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <Typography fontSize={18} variant="h6" mb={1} fontWeight={600}>
            Connect with Us
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <IconButton>
              <FaFacebookF color="#FF8C00" />
            </IconButton>
            <IconButton>
              <FaInstagram color="#FF8C00" />
            </IconButton>
            <IconButton>
              <FaXTwitter color="#FF8C00" />
            </IconButton>
          </Stack>
          <Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Subscribe to our newsletter to stay in the known for new offers
              and promotions.
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <InputBase
                sx={{
                  height: 35,
                  width: "70%",
                  border: "1px solid #ddd",
                  p: 1,
                }}
                placeholder="enter your email"
              />
              <Button
                sx={{
                  boxShadow: "none",
                  bgcolor: "#FF8C00",
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: "capitalize",
                  height: 35,
                  width: "30%",
                  "&:hover": { bgcolor: "#FF8C00", opacity: 0.9 },
                }}
                variant="contained"
              >
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
