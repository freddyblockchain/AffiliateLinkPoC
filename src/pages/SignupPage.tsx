import {
  Box,
  Button,
  Center,
  Heading,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { signup } from "../algorand/contracts/signup";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { Link } from "react-router-dom";

const myAlgoConnect = new MyAlgoConnect();

export const SignupPage = () => {
  const [accountAddress, setAccountAddress] = useState("");
  // Check app is connected with Pera Wallet
  let isConnectedToMyAlgoWallet = false;
  return (
    <Center>
      <VStack>
        <Heading> Signup page!</Heading>
        {accountAddress === "" ? (
          <Button onClick={async () => handleConnectWalletClick()}>
            Connect to wallet and sign up
          </Button>
        ) : null}
        {accountAddress !== "" ? (
          <Button>
            <ChakraLink>
              <Link to={`/payment`} color="teal.500">
                Go to PaymentPage
              </Link>
            </ChakraLink>
          </Button>
        ) : null}
      </VStack>
    </Center>
  );
  function handleConnectWalletClick() {
    const queryString = window.location.hash.substring(1);
    const affiliateAddress = queryString.split("=")[1];
    myAlgoConnect
      .connect()
      .then((newAccounts) => {
        signup(newAccounts[0].address, affiliateAddress).then(() => {
          alert("successfully signed up");
        });
        console.log("query string is: " + queryString);
        console.log("address is: " + newAccounts[0].address);
        console.log("affiliate is: " + affiliateAddress);
        setAccountAddress(newAccounts[0].address);
      })
      .catch((error) => {
        console.log("error" + error);
      });
  }
};
