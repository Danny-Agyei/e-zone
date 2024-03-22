import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Footer, HomeSkeleton, Navbar } from "../index";
import { Suspense } from "react";

const Layout = () => {
  return (
    <Suspense>
      <Box>
        <Navbar />
        <Box
          component="main"
          sx={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              m: "0 auto",
            }}
          >
            <Outlet />
          </Box>
        </Box>
        <Box component="footer" sx={{ position: "relative" }}>
          <Footer />
        </Box>
      </Box>
    </Suspense>
  );
};

export default Layout;
