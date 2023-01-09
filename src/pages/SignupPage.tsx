import { PeraWalletConnect } from "@perawallet/connect";
import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

export const SignupPage = () => {
  const peraWallet = new PeraWalletConnect({
    shouldShowSignTxnToast: true,
    network: "testnet",
    chainId: 416002,
  });
  const [accountAddress, setAccountAddress] = useState("");
  // Check app is connected with Pera Wallet
  const isConnectedToPeraWallet = accountAddress !== "";
  return (
    <Button
      onClick={
        isConnectedToPeraWallet
          ? handleDisconnectWalletClick
          : handleConnectWalletClick
      }
    >
      {isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
    </Button>
  );
  function handleConnectWalletClick() {
    alert("hello");
    peraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
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
