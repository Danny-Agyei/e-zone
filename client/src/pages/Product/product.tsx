import { Box, Grid } from "@mui/material";
import React from "react";

export default function Product() {
  return (
    <Box px={10}>
      <Grid container>
        <Grid item sm={12} md={6}></Grid>
        <Grid item sm={12} md={6}></Grid>
      </Grid>
    </Box>
  );
}
