import { Box, Button, Typography } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Box>
      <Typography>Oops! Something went wrong.</Typography>
      <Typography>{error.message || error.statusText} </Typography>
      <Button variant="text">
        <Link to={"/"}> Go Back</Link>
      </Button>
    </Box>
  );
}
