import { read } from "../utils.mjs";

read((err, data) => {
  if (err) throw err;
  const lines = data.split("\n");

  // drawn numbers
  const numbers = lines
    .shift()
    .split(",")
    .map((v) => parseInt(v));

  const boards = [];
  // build boards
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "" && lines[i + 1]) {
      boards.push(new Board());
      console.log("-----");
      continue;
    }
    console.log(line);
    if (!line) {
      break;
    }
    const board = boards[boards.length - 1];
    board.matrix.push([]);
    const len = board.matrix.length;
    const nums = line.split(" ").forEach((v, index) => {
      if (!v) {
        return;
      }
      const num = parseInt(v);
      board.sumOfUnmarked += num;
      board.numbers[num] = { num, row: len - 1, col: index };
      board.matrix[len - 1].push(num);
    });
  }

  let winningScore;
  let bingo = false;
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    console.log(num);

    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];

      if (!board.numbers[num]) {
        continue;
      }

      board.sumOfUnmarked -= num;
      board.markedNumbers.push(board.numbers[num]);
      if (board.markedNumbers.length < 5) {
        continue;
      }
      console.log(board);
      const cols = {};
      const rows = {};

      board.markedNumbers.forEach((markedNumber) => {
        if (rows[markedNumber.row]) {
          rows[markedNumber.row]++;
        } else {
          rows[markedNumber.row] = 1;
        }
        if (cols[markedNumber.col]) {
          cols[markedNumber.col]++;
        } else {
          cols[markedNumber.col] = 1;
        }

        if (rows[markedNumber.row] === 5 || cols[markedNumber.col] === 5) {
          bingo = true;
          return;
        }
      });

      if (bingo) {
        winningScore = num * board.sumOfUnmarked;
        break;
      }
    }

    if (bingo) {
      break;
    }
  }
  console.log(winningScore);
  console.log("done");
});

class Board {
  matrix = [];
  numbers = {};
  isComplete = false;
  // array of {row, col}
  markedNumbers = [];
  sumOfUnmarked = 0;
}
