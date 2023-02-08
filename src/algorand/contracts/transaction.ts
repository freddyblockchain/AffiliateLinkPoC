import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk, { Transaction, TransactionSigner } from "algosdk";
import {
  getMethodByName,
  algodClient,
  APP_ID,
  concat,
  creatorAddress,
  applicationAddress,
} from "../algoClient";

export async function transactions_to_sign(user: string, affiliate: string) {
  try {
    const encoder = new TextEncoder();
    let encodedA = encoder.encode("a");

    let userDecodedAddress = algosdk.decodeAddress(user);
    let affiliateDecodedAddress = algosdk.decodeAddress(affiliate);

    let userBytes = concat([userDecodedAddress.publicKey]);
    let affiliateBytes = concat([affiliateDecodedAddress.publicKey, encodedA]);

    const methodName = getMethodByName("affiliate_transaction");

    const atc = new algosdk.AtomicTransactionComposer();
    const sp = await algodClient.getTransactionParams().do();
    const signer = CustomTransactionSigner();
    const txn2 = {
      txn: new algosdk.Transaction({
        from: user,
        to: applicationAddress,
        amount: 3000000,
        ...sp,
      }),
      signer: signer,
    };
    console.log("here2");
    const commonParams = {
      appID: APP_ID,
      sender: user,
      suggestedParams: sp,
    };

    console.log(user);
    console.log(affiliate);
    console.log(creatorAddress);
    atc.addMethodCall({
      method: methodName,
      methodArgs: [txn2, affiliate, creatorAddress],
      boxes: [
        { appIndex: APP_ID, name: userBytes },
        { appIndex: APP_ID, name: affiliateBytes },
      ],
      ...commonParams,
      signer: signer,
    });
    console.log("in here before build");

    const group = atc.buildGroup();
    console.log("about to execute");
    await atc.execute(algodClient, 2);
  } catch (error) {
    console.log("error " + error);
  }
}

function CustomTransactionSigner(): TransactionSigner {
  return async (txnGroup: Transaction[], indexesToSign: number[]) => {
    const myAlgoConnect = new MyAlgoConnect();
    let bytes = myAlgoConnect.signTransaction(
      txnGroup.map((txn) => txn.toByte())
    );
    let blobs = await bytes;
    return blobs.map((blob) => blob.blob);
  };
}
