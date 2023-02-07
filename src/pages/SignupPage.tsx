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

export const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: true,
  chainId: 416002,
});

export const SignupPage = () => {
  const [accountAddress, setAccountAddress] = useState("");
  // Check app is connected with Pera Wallet
  const isConnectedToPeraWallet = accountAddress !== "";
  return (
    <Center>
      <VStack>
        <Heading> Signup page!</Heading>
        <Button
          onClick={
            isConnectedToPeraWallet
              ? handleDisconnectWalletClick
              : handleConnectWalletClick
          }
        >
          {isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
        </Button>
        {isConnectedToPeraWallet ? (
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
    peraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);

        signup(newAccounts[0], affiliateAddress).then(() => {
          console.log("successfully signed up");
        });
        console.log(newAccounts[0]);
        console.log(affiliateAddress);
      })
      .catch((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          // log the necessary errors
        }
      });
  }
  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    setAccountAddress("");
  }
};
