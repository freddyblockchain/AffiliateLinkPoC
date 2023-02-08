import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/FrontPage";
import { PaymentPage } from "./pages/PaymentPage";
import { SignupPage } from "./pages/SignupPage";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="xl">
      <Grid minH="100vh">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<FrontPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/payment" element={<PaymentPage />}></Route>
          </Routes>
        </BrowserRouter>
      </Grid>
    </Box>
  </ChakraProvider>
);
