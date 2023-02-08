import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { HashRouter, Route, Router, Routes } from "react-router-dom";
import { FrontPage } from "./pages/FrontPage";
import { PaymentPage } from "./pages/PaymentPage";
import { SignupPage } from "./pages/SignupPage";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="xl">
      <Grid minH="100vh">
        <HashRouter>
          <Routes>
            <Route path="/" element={<FrontPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/payment" element={<PaymentPage />}></Route>
          </Routes>
        </HashRouter>
      </Grid>
    </Box>
  </ChakraProvider>
);
