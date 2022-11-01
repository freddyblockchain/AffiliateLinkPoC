### LICENCE

```
MIT License

Copyright (c) 2022 FREDERIK NIELSEN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Link to projects

- https://github.com/freddyblockchain/NFTLottery
- https://github.com/freddyblockchain/Lottery-App

## Technologies used

- Reactjs
- Chakra ui
- Algorand javascript sdk
- Pyteal
- Github page

## Project Description

NFTLottery is a lottery, where algorand wallets can participate, to have a chance at winning an algorand asset.
There are 5 smart contract methods that can be called by anyone. These are:

- startLottery
- participate
- resolveLottery
- claimWin
- resetLottery

Each participant is given a number when participating, and when the lottery is resolved (meaning a winning number has been found), then the winning participant can claim an asset, and the lottery is done.
Each lottery can be reset after a set number of rounds, to account for a participant never claiming their reward.

## Project Architecture

The project is composed of a smart contract, that has the lottery logic, and a front end application, that simulates
a lottery. The randomness used in the smart contract is retrieved from the randomness smart contract, described in this article: https://developer.algorand.org/articles/usage-and-best-practices-for-randomness-beacon/

## How to use

During any of these steps, if calling the smart contract fails, an alert will pop up.
This happens if the lottery is in a state, that does not allow the pressed action.

- Go to https://freddyblockchain.github.io/Lottery-App/
- Press Start Lottery.
- press "Participate" on the test accounts present below. The accounts will now get a participant number and participant round
- Wait until the "Current Round" exceeds the "Lottery Round". Both are present on the bottom of the page.
- Press "Resolve Lottery". After some seconds, "Winning Round" will now have a number between 1 and the number of participants.
- Press "Claim Win" on the participant, whose participant number matches the winning number.
- After some seconds, an alert pops up saying you won the NFT, and the participant gets its asset number incremented, and the lottery is done.
- The whole process can now be repeated.

## Demo

## Roadmap

- Create off-chain lookup table, that could automate the process of sending the NFT to the winner.
- Create wallet integration, that would let any wallet access the lottery, from the front-end application.
