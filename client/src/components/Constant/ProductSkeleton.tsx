import { Box, Grid, Skeleton } from "@mui/material";

export default function ProductSkeleton() {
  return (
    <Box
      height="100%"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      px={10}
      mt={10}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={2}>
              <Skeleton
                variant="rectangular"
                height={60}
                sx={{ mb: 2 }}
                width={"100%"}
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                height={60}
                sx={{ mb: 2 }}
                width={"100%"}
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                height={60}
                sx={{ mb: 2 }}
                width={"100%"}
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                height={60}
                sx={{ mb: 2 }}
                width={"100%"}
                animation="wave"
              />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Skeleton
                variant="rectangular"
                height={"100%"}
                width={"100%"}
                animation="wave"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Skeleton variant="rectangular" height={100} animation="wave" />
          <Skeleton height={50} animation="wave" />
          <Skeleton height={50} animation="wave" />
          <Skeleton height={50} animation="wave" />
          <Skeleton height={50} animation="wave" />
          <Skeleton height={30} animation="wave" />
          <Skeleton height={30} width={80} animation="wave" />
        </Grid>
      </Grid>
    </Box>
  );
}
