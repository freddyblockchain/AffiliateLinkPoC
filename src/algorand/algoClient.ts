import algosdk, { ABIContract } from "algosdk";
import { affiliate_contract } from "./contracts/affiliate_contract";

const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-Key": "GCAE61OEML9V1hZKxCYf6EJBOGMHwvd15zmeM4Li",
};
export const algodClient = new algosdk.Algodv2(token, baseServer, port);
export const APP_ID = 157625321;

export const affiliateAddress =
  "AB4VIVK2F5K7H4RTXVYOSEJ6MSM5YSJSKCAZLDVIANJHEQH3DMVIN3QHMI";
export const creatorAddress =
  "OI6YO7U7JRE2CWEOALW3HRHAT7S364ZCFW2E2SS4I3B3BIUSUVPRJI7VRY";
export const platformMmonic =
  "glance fame avocado team tobacco spoon actress author situate swarm embark check design reform radio alien bachelor matter best diesel whip select idle absorb film";

export const dummyAccountMmonic =
  "topple cruel neutral rose glory glad prevent output box snap notice child actor poem forget ship luxury vanish tank mention cloth rally sheriff abstract alert";

export const getMethodByName = (name: string) => {
  const contract = new ABIContract(affiliate_contract);

  const m = contract.methods.find((mt) => {
    return mt.name === name;
  });
  if (m === undefined) throw Error("Method undefined");
  return m;
};

export function concat(arrays: Uint8Array[]) {
  // sum of individual array lengths
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  let result = new Uint8Array(totalLength);

  if (!arrays.length) return result;

  // for each array - copy it over result
  // next array is copied right after the previous one
  let length = 0;
  for (let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
