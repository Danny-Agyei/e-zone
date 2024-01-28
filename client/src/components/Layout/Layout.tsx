import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Footer, Navbar } from "../index";

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Box component="main" minHeight="80vh">
        <Outlet />
      </Box>
      <Box component="footer">
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
