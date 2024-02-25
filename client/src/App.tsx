import { Box, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error, Layout } from "./components";

import * as HomeRoute from "./routes/Home.route";
import * as ProductRoute from "./routes/Product.route";
import * as ShopRoute from "./routes/Shop.route";

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
      {
        path: "/shop/collection/:category",
        loader: ShopRoute.loader,
        Component: ShopRoute.Component,
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
      primary: "#1c1b1b",
      secondary: "#ffb100",
    },
  },
  typography: {
    fontFamily: `"Rubik", sans-serif`,
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
