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
import { signup } from "../algorand/contracts/signup";
import MyAlgoConnect from "@randlabs/myalgo-connect";

const myAlgoConnect = new MyAlgoConnect();

export const SignupPage = () => {
  const [accountAddress, setAccountAddress] = useState("");
  // Check app is connected with Pera Wallet
  let isConnectedToMyAlgoWallet = false;
  return (
    <Center>
      <VStack>
        <Heading> Signup page!</Heading>
        <Button onClick={async () => await handleConnectWalletClick()}>
          Connect to wallet and sign up
        </Button>
        {accountAddress !== "" ? (
          <Button>
            <Link href={`payment`} color="teal.500">
              Go to PaymentPage
            </Link>
          </Button>
        ) : null}
      </VStack>
    </Center>
  );
  function handleConnectWalletClick() {
    const queryString = window.location.search;
    const affiliateAddress = queryString.split("=")[1];
    myAlgoConnect
      .connect()
      .then((newAccounts) => {
        signup(newAccounts[0].address, affiliateAddress).then(() => {
          alert("successfully signed up");
        });
        setAccountAddress(newAccounts[0].address);
      })
      .catch((error) => {
        console.log("error");
      });
  }
};
