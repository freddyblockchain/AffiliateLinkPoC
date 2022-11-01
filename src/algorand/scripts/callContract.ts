import {
  ABIContract,
  Account,
  AtomicTransactionComposer,
  makeBasicAccountTransactionSigner,
} from "algosdk";
import { algodClient, APP_ID } from "../algoClient";
import { abiMethods } from "../../types";
import { lottery_contract } from "../build/lottery_contract";

const getMethodByName = (name: abiMethods) => {
  const contract = new ABIContract(lottery_contract);

  const m = contract.methods.find((mt) => {
    return mt.name === name;
  });
  if (m === undefined) throw Error("Method undefined");
  return m;
};

export const callContractByName = async (
  account: Account,
  name: abiMethods,
  params: any[]
) => {
  console.log("trying to call : " + name);
  console.log("trying to get abi method from json file");
  const method = getMethodByName(name);

  const sp = await algodClient.getTransactionParams().do();
  const commonParams = {
    appID: APP_ID,
    sender: account.addr,
    suggestedParams: sp,
    signer: makeBasicAccountTransactionSigner(account),
  };

  console.log("trying to build transaction group: ");

  const comp = new AtomicTransactionComposer();
  comp.addMethodCall({
    method: method,
    methodArgs: params,
    ...commonParams,
  });
  comp.buildGroup();

  console.log("trying to execute transaction : ");

  const result = await comp.execute(algodClient, 2);
  const value = result.methodResults[0].returnValue;

  console.log("trying to return value");

  return value;
};
