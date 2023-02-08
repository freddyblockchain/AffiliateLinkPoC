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
import { affiliateAddress, algodClient, APP_ID } from "../algorand/algoClient";
import { peraWallet } from "./SignupPage";
import algosdk, { decodeAddress, encodeAddress } from "algosdk";
import { transactions_to_sign } from "../algorand/contracts/transaction";
import { signup } from "../algorand/contracts/signup";
import MyAlgoConnect from "@randlabs/myalgo-connect";

export const PaymentPage = () => {
  const param = `?generatorWallet=${affiliateAddress}`;
  const [isVisible, setVisible] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const myAlgoConnect = new MyAlgoConnect();
  peraWallet.reconnectSession();
  return (
    <Center>
      <VStack>
        <Heading>Payment Page!</Heading>
        {accountAddress === "" ? (
          <Button onClick={async () => await handleConnectWalletClick()}>
            Connect to my algo wallet
          </Button>
        ) : null}
        <Text> Connected Wallet: {accountAddress} </Text>

        {accountAddress !== "" ? (
          <Button onClick={handleAffiliateTransaction}>
            Pay 5 algo affiliate fee
          </Button>
        ) : null}
      </VStack>
    </Center>
  );

  async function handleAffiliateTransaction() {
    console.log("here");
    const user = accountAddress;

    const userDecoded = decodeAddress(user!);
    const affiliateBox = await algodClient
      .getApplicationBoxByName(APP_ID, userDecoded.publicKey)
      .do();

    const affiliateAddress = encodeAddress(affiliateBox.value);

    const txnSigners = transactions_to_sign(
      accountAddress,
      affiliateAddress
    ).then(() => {
      alert("successfully made affiliate transaction!");
    });
  }

  function handleConnectWalletClick() {
    console.log("here!");
    myAlgoConnect
      .connect()
      .then((newAccounts) => {
        setAccountAddress(newAccounts[0].address);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
