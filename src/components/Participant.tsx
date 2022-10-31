import { Box, Button, Text, Flex, Spacer } from "@chakra-ui/react";
import { mnemonicToSecretKey } from "algosdk";
import { useEffect, useState } from "react";
import { LOTTERY_TOKEN_ID } from "../algorand/algoClient";
import { callContractByName } from "../algorand/scripts/callContract";
import {
  getParticipantNumber,
  getParticipantRound,
  lotteryTokenBalance,
} from "../algorand/scripts/readState";
import { account } from "../types";

interface ParticipantProps {
  account: account;
  key: number;
}

export const Participant = (props: ParticipantProps) => {
  const [participantNumber, setParticipantNumber] = useState<number | bigint>();
  const [participantRound, setParticipantRound] = useState<number | bigint>();
  const [lotteryTokensWon, setLotteryTokensWon] = useState<number | bigint>(0);
  const algoAccount = mnemonicToSecretKey(props.account.mmemonic);
  const participate = async () => {
    callContractByName(algoAccount, "participate", [])
      .then(() => {
        getParticipantNumber(algoAccount).then((num) => {
          setParticipantNumber(num);
        });
        getParticipantRound(algoAccount).then((num) => {
          setParticipantRound(num + 7);
        });
        alert("Sucessfully participated");
      })
      .catch((error) => {
        console.log(error);
        alert("there was an error participating in this lottery");
      });
  };
  const claimReward = async () => {
    callContractByName(algoAccount, "claimWin", [LOTTERY_TOKEN_ID])
      .then(() => {
        alert("you successfully claimed the NFT!");
        lotteryTokenBalance(algoAccount).then((num) => {
          setLotteryTokensWon(num);
        });
      })
      .catch((error) => {
        console.log(error);
        alert("there was an error claiming the NFT");
      });
  };
  useEffect(() => {
    lotteryTokenBalance(algoAccount).then((num) => {
      setLotteryTokensWon(num);
    });
  }, [algoAccount]);
  return (
    <Box>
      <Text>{props.account.address}</Text>
      <Flex paddingBottom={"1.5rem"}>
        <Button colorScheme="blue" onClick={participate}>
          Participate
        </Button>
        <Box marginRight="10rem">
          <Text paddingLeft={"13rem"}>
            Participant Number: {participantNumber?.toString()}
          </Text>
          <Text paddingLeft={"13rem"}>
            Participant Round: {participantRound?.toString()}
          </Text>
          <Text paddingLeft={"13rem"}>
            Lottery Tokens won: {lotteryTokensWon?.toString()}
          </Text>
        </Box>
        <Spacer />
        <Button colorScheme="green" onClick={claimReward}>
          Claim Reward
        </Button>
      </Flex>
    </Box>
  );
};
