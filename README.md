# How it works: LinkBox

### by Freddyblockchain & Milo SP

# Demo

https://www.loom.com/share/68ac163985f64eca8831b43dd39d15c1

# Problem We Are Solving

Algorand startup's have limited ways to accurately track the KPIs of Ambassador programs and do not know what users are driving growth on their platform. Moreover, existing users have limited incentives to refer new users; plus if they do share the websites URL online they have no way to see how many new users signed up to the platform and how much trading volume they did.

# Solution

We wanted to create an on-chain affiliate referral tool to incentivise existing users to share their favourite algorand startups and receive lifetime commission on their trading volume, all guaranteed by smart contracts. All whilst simultaneously providing a high growth tool for founders to leverage their user's personal network and incentivise them to relentlessly share their startup online.

# How it works:

## The Flow

1. Affiliate (existing user) generates the sharing link to the Website and shares it online.

2. newUser clicks Affiliate's referral link and signs up to Website

This is then logged and added to the box indicating that newUser signed up thanks to the Affiliate

3. newUser goes to checkout on the Website and makes payment.

_Linkbox will then look up the box to see if the user came from an Affiliate link, if so they are then added to the payout._

4. Payout - Affiliate and Linkbox is compensated.
   In the payment, the box storage [application](https://testnet.algoexplorer.io/application/157625321) is called and the payout is handled by the contract. This guarantees the Affiliate is payed out, along with Linkbox for the solution.

If Linkbox is integrated into a platform - the Affiliate's commission would come out of the platform's fee.
The platform can set the Affiliates's commission.

# Technology used

-React
-Pyteal/Beaker
-algosdk (algorand javascript sdk)
-purestake
-Chakra ui
-Github pages

# Roadmap

Integrate into Algorand projects and offer new Affiliate compensation schemes.

# Demo

https://www.loom.com/share/68ac163985f64eca8831b43dd39d15c1

- The smart contract is located in AffiliateLinkPoC/src/algorand/contracts/beakerContract.py.
- The smart contract lives on the testnet, and the app-id is : 157625321

Linkbox can be easily integrated into a platform's existing smart contracts via a group transaction that handles the payment.
