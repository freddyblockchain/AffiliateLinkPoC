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

export const PaymentPage = () => {
  const param = `?generatorWallet=${affiliateAddress}`;
  const [isVisible, setVisible] = useState(false);
  peraWallet.reconnectSession();
  return (
    <Center>
      <VStack>
        <Heading>Payment Page!</Heading>
        <Text> Connected Wallet: {peraWallet.connector?.accounts[0]}</Text>
        <Button onClick={handleAffiliateTransaction}>
          Pay 5 algo affiliate fee
        </Button>
      </VStack>
    </Center>
  );
};

async function handleAffiliateTransaction() {
  const user = peraWallet.connector?.accounts[0];

  const userDecoded = decodeAddress(user!);
  const affiliateBox = await algodClient
    .getApplicationBoxByName(APP_ID, userDecoded.publicKey)
    .do();

  const affiliateAddress = encodeAddress(affiliateBox.value);

  const txnSigners = await signup(user!, affiliateAddress);

  const txnGroup = [{ txn: txnSigners[0].txn, signers: [user!] }];

  try {
    console.log("here");
    console.log(user!);
    console.log(txnGroup[0].txn.amount);
    const signedTxns = await peraWallet.signTransaction([txnGroup]);
    const { txId } = await algodClient.sendRawTransaction(signedTxns).do();

    console.log("txnId :" + txId);
  } catch (error) {
    console.log("Couldn't sign Opt-in txns", error);
  }
}
