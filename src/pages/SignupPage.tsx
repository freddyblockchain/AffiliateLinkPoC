import { PeraWalletConnect } from "@perawallet/connect";
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

export const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: true,
  chainId: 416002,
});

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
          Connect to my algo wallet
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
          console.log("successfully signed up");
        });
        console.log("here!" + newAccounts[0].address);
        console.log(newAccounts[0]);
        console.log(affiliateAddress);
        setAccountAddress(newAccounts[0].address);
      })
      .catch((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          // log the necessary errors
        }
      });
  }
};
