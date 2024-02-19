import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Footer, HomeSkeleton, Navbar } from "../index";
import { Suspense } from "react";

const Layout = () => {
  return (
    <Suspense>
      <Box>
        <Navbar />
        <Box component="main">
          <Outlet />
        </Box>
        <Box component="footer">
          <Footer />
        </Box>
      </Box>
    </Suspense>
  );
};

export default Layout;
