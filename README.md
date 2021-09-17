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

## Verification

Since the drawing process is deterministic, anyone can verify the raffle result.

### Round 1

Winner count: `275`

Ticket list file:

- Path: `./data/round_1/tickets.csv`
- SHA256: `4d9d8508b208468715a2790e5f3a6aebfaf9a64d01f1ed8f37d45c160ca6d6e2`
- SHA512: `6ef7868e2eee9b1c92329659673bec9f55541d887a9bb850776d4a7fb674e7dc0cf771e93af20408b440fd133474735d1e70ee0d387e690d45415c686a514777`

Token list file:

- Path: `./data/round_1/tokens.csv`
- SHA256: `4bec6ebef61a2fac79c46cf78d901460a11ec9fbe222f9ca33befd6785a1f443`
- SHA512: `35f84abdaf40c4356857c54ec14b5be92ada375157c35f51958b0bf81fb55053de68a70f75e29e697c5f939cf8abe9997129e0550d47e1b6331597de1761e1b9`

Bitcoin Block:

- Height: `700610`
- Hash: `0000000000000000000397ac86aa3e40460d66fda094179344bc457ab9c4b07c`

### Round 2

Winner count: `275`

Ticket list file:

- Path: `./data/round_2/tickets.csv`
- SHA256: `2e65f0805f79b3f9959b57bed249eaf455b1567e184335d6f55ecf2fde2b68ce`
- SHA512: `2c1c0df17c62364f7079741d16894baec1e9adfd64d6a6732ce4b9c3ee3f467045b97e7282c6548cef491811b647763102052cf04d77790fd322678150589316`

Token list file:

- Path: `./data/round_2/tokens.csv`
- SHA256: `1f57ea9f6c4f4929480f95938ec2a43822141d839f503dc21fda3a5c1a4e7312`
- SHA512: `0a3486d7a48513868bc2703eb25c2909de00148f60beb118363418c5806b137cbc236b12fd62732e9d6a2d04c1307cb341865fe0a5a9e0bcaf8460807f4158fb`

Bitcoin Block:

- Height: `700890`
- Hash: `00000000000000000005fa80c80fad8030c640742e73dbbfdefa3f1e1fbb2fe3`
