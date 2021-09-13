# Sevens Airdrop Raffle

This repository contains a simple raffle tool that draws winners deterministically given a fixed seed of randomness. It's used in the Sevens NFT airdrop to distribute tokens fairly.

## Usage

To run a raffle draw, first install the dependencies:

```sh
$ yarn install
```

Then run the draw:

```sh
$ yarn ts-node ./src/index.ts <WINNER_COUNT> <TICKET_LIST_FILE> <TOKEN_LIST_FILE> <BITCOIN_BLOCK_HASH>
```

where:

- `WINNER_COUNT`: the number of winners
- `TICKET_LIST_FILE`: path to the CSV file containing the list of addresses with weights
- `TOKEN_LIST_FILE`: path to the CSV file containing the list of token IDs
- `BITCOIN_BLOCK_HASH`: Bitcoin block hash in hexadecimal format
