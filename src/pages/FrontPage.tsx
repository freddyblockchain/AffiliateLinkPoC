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

export const FrontPage = () => {
  const link = "signup";
  const param = `?generatorWallet=${personGeneratingLinkWallet.address}`;
  const [isVisible, setVisible] = useState(false);
  return (
    <Center>
      <VStack>
        <Heading>Generate Link Page!</Heading>
        <Button onClick={() => setVisible(true)}>Generate Link</Button>
        {isVisible ? (
          <Link href={`signup${param}`} color="teal.500">
            localhost:3000/signup{param}
          </Link>
        ) : null}
      </VStack>
    </Center>
  );
};
