import { read } from "../utils.mjs";

function part1(err, data) {
  if (err) throw err;
  const lines = data.split("\n");
  console.log(lines);
  let increases = 0;
  for (let index = 1; index < lines.length; index++) {
    const input = +lines[index];
    const prev = +lines[index - 1];
    if (input > prev) {
      increases++;
    }
  }
  console.log(increases);
}

function part2(err, data) {
  if (err) throw err;
  const lines = data.split("\n").map((val) => parseInt(val));
  console.log(lines);
  let currentSum = 0;
  let nextSum = 0;
  let increases = 0;
  for (let i = 0; i < 3; i++) {
    currentSum += lines[i];
  }

  for (let i = 3; i < lines.length; i++) {
    const left = lines[i - 3];
    const right = lines[i];
    nextSum = currentSum - left + right;
    if (nextSum > currentSum) {
      increases++;
    }
    currentSum = nextSum;
  }
  console.log(increases);
}

/**
 *
 * @param {string[]} arr
 * @param {number} size
 */
function chunk(arr, size) {
  const chunked = [];
  let index = 0;
  while (index < arr.length) {
    chunked.push(arr.slice(index, index + size));
    index += size;
  }
  console.log(chunked);
}

// read(part1);

// part 2
read(part2);
