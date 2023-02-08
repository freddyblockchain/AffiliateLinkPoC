import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { affiliateAddress } from "../algorand/algoClient";

export const FrontPage = () => {
  const param = `?generatorWallet=${affiliateAddress}`;
  const [isVisible, setVisible] = useState(false);
  return (
    <Center>
      <VStack>
        <Heading>Generate Link Page!</Heading>
        <Button onClick={() => setVisible(true)}>Generate Link</Button>
        {isVisible ? (
          <ChakraLink>
            <Link to={`/signup${param}`} color="teal.500">
              localhost:3000/signup{param}
            </Link>
          </ChakraLink>
        ) : null}
      </VStack>
    </Center>
  );
};
