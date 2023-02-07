import algosdk from "algosdk";
import {
  getMethodByName,
  algodClient,
  APP_ID,
  concat,
  dummyAccountMmonic,
  creatorAddress,
} from "../algoClient";

const applicationAddress =
  "YB6KBSSB5DGM4ND74YX6IO5ERXSLST7TP3EAO6RXPU5M6JWFYX3IA7AFJA";

const dummyAccount = algosdk.mnemonicToSecretKey(dummyAccountMmonic);

let myaccount = algosdk.mnemonicToSecretKey(
  "share effort absurd city this hole tattoo text hood boss assume rhythm spot mouse pudding table miracle benefit ill chronic bargain tunnel author ability much"
);

export async function transactions_to_sign(
  user: string,
  affiliate: string
): Promise<algosdk.TransactionWithSigner[]> {
  const encoder = new TextEncoder();
  let encodedA = encoder.encode("a");

  let userDecodedAddress = algosdk.decodeAddress(user);
  let affiliateDecodedAddress = algosdk.decodeAddress(affiliate);

  let userBytes = concat([userDecodedAddress.publicKey]);
  let affiliateBytes = concat([affiliateDecodedAddress.publicKey, encodedA]);

  const methodName = getMethodByName("affiliate_transaction");

  const atc = new algosdk.AtomicTransactionComposer();

  const sp = await algodClient.getTransactionParams().do();
  const txn = {
    txn: new algosdk.Transaction({
      from: user,
      to: applicationAddress,
      amount: 5000000,
      ...sp,
    }),
    signer: algosdk.makeBasicAccountTransactionSigner(myaccount),
  };
  const commonParams = {
    appID: APP_ID,
    sender: user,
    suggestedParams: sp,
    signer: algosdk.makeBasicAccountTransactionSigner(myaccount),
  };
  atc.addMethodCall({
    method: methodName,
    methodArgs: [txn, affiliate, creatorAddress],
    boxes: [
      { appIndex: APP_ID, name: userBytes },
      { appIndex: APP_ID, name: affiliateBytes },
    ],
    ...commonParams,
  });
  const group = atc.buildGroup();
  return group;
}
