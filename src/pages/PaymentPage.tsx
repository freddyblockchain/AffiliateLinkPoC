import {
  Box,
  Button,
  Center,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { personGeneratingLinkWallet } from "../wallets";
import { peraWallet } from "./SignupPage";

export const PaymentPage = () => {
  const param = `?generatorWallet=${personGeneratingLinkWallet.address}`;
  const [isVisible, setVisible] = useState(false);
  peraWallet.reconnectSession();
  return (
    <Center>
      <VStack>
        <Heading>Payment Page!</Heading>
        <Text> Connected Wallet: {peraWallet.connector?.accounts[0]}</Text>
        <Button>Pay 1 algo</Button>
      </VStack>
    </Center>
  );
};
