import algosdk from "algosdk";
import {
  algodClient,
  APP_ID,
  concat,
  getMethodByName,
  platformMmonic,
} from "../algoClient";

let platformAccount = algosdk.mnemonicToSecretKey(platformMmonic);

export async function signup(user: string, affiliate: string) {
  const encoder = new TextEncoder();
  let encodedC = encoder.encode("c");

  let userDecodedAddress = algosdk.decodeAddress(user);
  let affiliateDecodedAddress = algosdk.decodeAddress(affiliate);

  let userBytes = concat([userDecodedAddress.publicKey]);
  let affiliateBytes = concat([affiliateDecodedAddress.publicKey, encodedC]);

  const methodName = getMethodByName("signup");

  const sp = await algodClient.getTransactionParams().do();
  const commonParams = {
    appID: APP_ID,
    sender: platformAccount.addr,
    suggestedParams: sp,
    signer: algosdk.makeBasicAccountTransactionSigner(platformAccount),
  };

  const atc = new algosdk.AtomicTransactionComposer();
  atc.addMethodCall({
    method: methodName,
    methodArgs: [user, affiliate],
    boxes: [
      { appIndex: APP_ID, name: userBytes },
      { appIndex: APP_ID, name: affiliateBytes },
    ],
    ...commonParams,
  });
  //const result = await atc.execute(algodClient, 5);
  console.log("done");
  return atc.buildGroup();
}
