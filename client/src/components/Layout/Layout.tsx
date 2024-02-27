import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Footer, HomeSkeleton, Navbar } from "../index";
import { Suspense } from "react";

const Layout = () => {
  return (
    <Suspense>
      <Box>
        <Navbar />
        <Box component="main" sx={{ minHeight: "60vh" }}>
          <Outlet />
        </Box>
        <Box component="footer" sx={{ position: "relative" }}>
          <Footer />
        </Box>
      </Box>
    </Suspense>
  );
};

export default Layout;
