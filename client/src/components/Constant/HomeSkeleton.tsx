import { Box, Grid, Skeleton } from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Box>
      <Box px={10} mt={4}>
        <Skeleton variant="rectangular" height={300} animation="wave" />
      </Box>
      <Box px={10} mt={4}>
        <Skeleton
          sx={{ mb: 4, mt: 8 }}
          height={30}
          width={150}
          animation="wave"
        />
        <Grid container spacing={4}>
          {Array.from(new Array(8)).map((_, indx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={indx}>
              <Skeleton variant="rectangular" height={150} animation="wave" />
              <Skeleton height={30} animation="wave" />
              <Skeleton height={30} width={80} animation="wave" />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
