import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  affiliateAddress,
  algodClient,
  APP_ID,
  concat,
} from "../algorand/algoClient";
import algosdk, { decodeAddress, encodeAddress } from "algosdk";
import { transactions_to_sign } from "../algorand/contracts/transaction";
import MyAlgoConnect from "@randlabs/myalgo-connect";

export const PaymentPage = () => {
  const [accountAddress, setAccountAddress] = useState("");
  const [amount, setAmount] = useState("user not connected");
  const [userCount, setUserCount] = useState("user not connected");
  const myAlgoConnect = new MyAlgoConnect();

  useEffect(() => {
    getAffiliateBox("a").then((value) => {
      setAmount(value);
    });
    getAffiliateBox("c").then((value) => {
      setUserCount(value);
    });
  }, [accountAddress]);
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
            Pay 3 algo affiliate fee
          </Button>
        ) : null}
        <HStack spacing={"10rem"}>
          <Text>Amount of algo accumulated by affiliate {amount}</Text>
          <Text>Amount of users signed up by affiliate link : {userCount}</Text>
        </HStack>
      </VStack>
    </Center>
  );

  async function getAffiliateBox(letter: string): Promise<string> {
    let value = "";
    try {
      const affiliateAddress = await getAffiliateAddress();
      const encoder = new TextEncoder();
      const decoder = new TextDecoder("utf8");
      let encodedLetter = encoder.encode(letter);
      const addressDecoded = decodeAddress(affiliateAddress);
      let affiliateBytes = concat([addressDecoded.publicKey, encodedLetter]);
      const affiliateBox = await algodClient
        .getApplicationBoxByName(APP_ID, affiliateBytes)
        .do();

      let number = affiliateBox.value.reduce((acc, val) => acc * 256 + val, 0);
      if (letter === "a") {
        // convert to algos
        number = number / 1000000;
      }

      value = number.toString();
    } catch (error) {
      console.log("error" + error);
    }

    return value;
  }

  async function getAffiliateAddress(): Promise<string> {
    const userDecoded = decodeAddress(accountAddress);
    const affiliateBox = await algodClient
      .getApplicationBoxByName(APP_ID, userDecoded.publicKey)
      .do();
    const affiliateAddress = encodeAddress(affiliateBox.value);
    return encodeAddress(affiliateBox.value);
  }

  async function handleAffiliateTransaction() {
    const affiliateAddress = getAffiliateAddress().then(
      async (affiliateAddress) => {
        const txnSigners = await transactions_to_sign(
          accountAddress,
          affiliateAddress
        ).then(() => {
          alert("successfully made affiliate transaction!");
          getAffiliateBox("a").then((value) => {
            setAmount(value);
          });
          getAffiliateBox("c").then((value) => {
            setUserCount(value);
          });
        });
      }
    );
  }

  async function handleConnectWalletClick() {
    myAlgoConnect
      .connect()
      .then(async (newAccounts) => {
        setAccountAddress(newAccounts[0].address);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
