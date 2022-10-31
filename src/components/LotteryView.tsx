import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { mnemonicToSecretKey } from "algosdk";
import { RANDOM_CONTRACT_ID } from "../algorand/algoClient";
import { callContractByName } from "../algorand/scripts/callContract";
import { getParticipantAddresses } from "../utils/getParticipantAddresses";
import { Participant } from "./Participant";

export const LotteryView = () => {
  const arbitraryAccount = getParticipantAddresses()[0].mmemonic;
  const algoAccount = mnemonicToSecretKey(arbitraryAccount);
  const startLottery = async () => {
    callContractByName(algoAccount, "startLottery", [])
      .then(() => alert("Lottery started!"))
      .catch((error) => {
        alert("Lottery Failed to start!");
        console.log(error);
      });
  };
  const resetLottery = async () => {
    callContractByName(algoAccount, "resetLottery", [])
      .then(() => alert("Lottery reset!"))
      .catch((error) => {
        alert("Lottery Failed to reset!");
        console.log(error);
      });
  };
  const resolveLottery = async () => {
    callContractByName(algoAccount, "resolveLottery", [RANDOM_CONTRACT_ID])
      .then(() => alert("Lottery resolved!"))
      .catch((error) => {
        alert("Lottery Failed to resolve!");
        console.log(error);
      });
  };
  const participants = getParticipantAddresses().map((account, index) => (
    <Participant account={account} key={index} />
  ));
  return (
    <Box>
      <VStack spacing={"2rem"}>
        <Button colorScheme="blue" onClick={startLottery}>
          Start Lottery
        </Button>
        <Box>{participants}</Box>
        <HStack>
          <Button colorScheme="red" onClick={resetLottery}>
            Reset Lottery
          </Button>
          <Button colorScheme="blue" onClick={resolveLottery}>
            Resolve Lottery
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
