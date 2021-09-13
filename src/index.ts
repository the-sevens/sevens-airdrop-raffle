// Usage:
//     ts-node index.ts <WINNER_COUNT> <TICKET_LIST_FILE> <TOKEN_LIST_FILE> <BITCOIN_BLOCK_HASH>

import * as fs from "fs";
import * as csv from "@fast-csv/parse";
import seedrandom from "seedrandom";

interface Weighted {
  weight: number;
}

interface Ticket<T> extends Weighted {
  item: T;
}

const args: string[] = process.argv.slice(2);
if (args.length !== 4) {
  console.error(
    "Usage: ts-node index.ts <WINNER_COUNT> <TICKET_LIST_FILE> <TOKEN_LIST_FILE> <BITCOIN_BLOCK_HASH>"
  );
  process.exit(1);
}

const argWinnerCount: string = args[0];
const argTicketListFile: string = args[1];
const argTokenListFile: string = args[2];
const argBitcoinBlockHash: string = args[3];

const winnerCount: number = parseInt(argWinnerCount);

if (isNaN(winnerCount) || !isFinite(winnerCount) || winnerCount <= 0) {
  console.error("Invalid winner count");
  process.exit(1);
}
if (!fs.existsSync(argTicketListFile)) {
  console.error("Ticket file not found");
  process.exit(1);
}
if (!fs.existsSync(argTokenListFile)) {
  console.error("Token file not found");
  process.exit(1);
}
if (!/^[0-9a-f]{64}$/.test(argBitcoinBlockHash)) {
  console.error("Invalid Bitcoin block hash format");
  process.exit(1);
}

const readTicketsFromFile = <T>(
  filePath: string,
  isWeighted: boolean,
  ticketIdConverter: (value: string) => T
): Promise<Ticket<T>[]> => {
  return new Promise((resolve, reject) => {
    const tickets: Ticket<T>[] = [];

    csv
      .parseFile(filePath)
      .on("error", reject)
      .on("data", (row: string[]) => {
        if (row.length !== (isWeighted ? 2 : 1)) {
          reject(new Error("Invalid row length"));
          return;
        }
        const weight: number = isWeighted ? parseInt(row[1]) : 1;
        if (isNaN(weight) || !isFinite(weight) || weight <= 0) {
          reject(new Error("Invalid weight"));
          return;
        }
        tickets.push({
          item: ticketIdConverter(row[0]),
          weight,
        });
      })
      .on("end", () => resolve(tickets));
  });
};

const determineIndexByWeight = (
  weights: Weighted[],
  weight: number
): number => {
  let accumulatedWeight: number = 0;
  for (let ind = 0; ind < weights.length; ind++) {
    accumulatedWeight += weights[ind].weight;
    if (accumulatedWeight > weight) {
      return ind;
    }
  }

  throw new Error("Invalid weight");
};

const drawIncides = (
  weights: Weighted[],
  drawCount: number,
  rng: () => number
): number[] => {
  const weightSum: number = weights.reduce(
    (prev, curr) => prev + curr.weight,
    0
  );

  const indices: number[] = [];
  const dedupSet: Set<number> = new Set<number>();

  while (true) {
    if (indices.length === drawCount) break;

    const currentDrawWeight: number = Math.floor(rng() * weightSum);
    const currentDrawIndex: number = determineIndexByWeight(
      weights,
      currentDrawWeight
    );

    if (dedupSet.has(currentDrawIndex)) continue;

    indices.push(currentDrawIndex);
    dedupSet.add(currentDrawIndex);
  }

  return indices;
};

const run = async () => {
  const tickets: Ticket<string>[] = await readTicketsFromFile<string>(
    argTicketListFile,
    true,
    (value) => value
  );
  if (tickets.length < winnerCount) {
    throw new Error("Insufficient tickets");
  }

  const tokenIds: Ticket<number>[] = await readTicketsFromFile<number>(
    argTokenListFile,
    false,
    (value) => {
      const parsedValue: number = parseInt(value);
      if (isNaN(parsedValue) || !isFinite(parsedValue) || parsedValue < 0) {
        throw new Error("Invalid token ID");
      }

      return parsedValue;
    }
  );
  if (tokenIds.length < winnerCount) {
    throw new Error("Insufficient tokens");
  }

  const rng = seedrandom(argBitcoinBlockHash);

  const ticketIndices: number[] = drawIncides(tickets, winnerCount, rng);
  const tokenIndices: number[] = drawIncides(tokenIds, winnerCount, rng);
  if (
    ticketIndices.length !== winnerCount ||
    tokenIndices.length !== winnerCount
  ) {
    throw new Error("Invalid draw result");
  }

  for (let ind = 0; ind < winnerCount; ind++) {
    console.log(
      `\"${tickets[ticketIndices[ind]].item}\",${
        tokenIds[tokenIndices[ind]].item
      }`
    );
  }
};

run()
  .then(() => {
    process.exit(0);
  })
  .catch((ex) => {
    console.error(ex);
    process.exit(1);
  });
