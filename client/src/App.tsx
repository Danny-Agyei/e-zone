import { Box, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error, Layout } from "./components";

import * as HomeRoute from "./routes/Home.route";
import * as ProductRoute from "./routes/Product.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: HomeRoute.Component,
        loader: HomeRoute.loader,
      },
      {
        path: "/products/:slug",
        loader: ProductRoute.loader,
        Component: ProductRoute.Component,
      },
    ],
  },
]);

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#13131a",
      secondary: "#FF8C00",
    },
  },
  typography: {
    fontFamily: `"Work Sans", sans-serif`,
  },
});

function App() {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Box>
  );
}

export default App;
