import { read } from "../utils.mjs";

const dummyData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;
read((err, data) => {
  if (err) throw err;

  const lines = data.split("\n");
  const byBit = {};

  console.log(lines);

  /* lines.forEach((line) => {
    line.split("").forEach((char, index) => {
      if (!byBit[index]) {
        byBit[index] = [char];
        return;
      }
      byBit[index].push(char);
    });
  }); */
  /**
   *
   * @param {string[]} numbers
   * @param {number} char
   * @returns
   */
  function findRating(numbers, char = 0, commonOrLeast = "1") {
    if (numbers.length === 1) {
      return toDecimal(numbers[0]);
    }
    // find the common value at the index
    let mostCommonOrLeast;
    if (commonOrLeast === "1") {
      mostCommonOrLeast = findMostCommonValue(numbers, char);
    } else if (commonOrLeast === "0") {
      mostCommonOrLeast = findLeastCommonValue(numbers, char);
    } else {
      throw new Error("invalid commonOrLeast value");
    }

    // filter the numbers that has that common value at the index
    const filtered = numbers.filter((num) => {
      if (mostCommonOrLeast === "-1" && num.charAt(char) === commonOrLeast) {
        return true;
      }
      return num.charAt(char) === mostCommonOrLeast;
    });
    // call findRating with filtered array and char + 1
    return findRating(filtered, char + 1, commonOrLeast);
  }
  const oxygenGeneratorRating = findRating(lines);
  const co2ScrubberRating = findRating(lines, 0, "0");
  console.log(oxygenGeneratorRating * co2ScrubberRating);
  // const gamaArr = [];
  // const epsilonArr = [];
  // console.log(byBit);
  /*  Object.values(byBit).forEach((arr) => {
    let ones = 0;
    let zeros = 0;
    let mostCommonValue;
    arr.forEach((char) => {
      if (char === "1") {
        ones++;
      } else {
        zeros++;
      }
    });
    if (ones > zeros) {
      gamaArr.push(1);
      epsilonArr.push(0);
      mostCommonValue = 1;
    } else {
      gamaArr.push(0);
      epsilonArr.push(1);
      mostCommonValue = 0;
    }
  }); */

  /* const gama = parseInt(gamaArr.join(""), 2);
  const epsilon = parseInt(epsilonArr.join(""), 2);

  const powerConsumption = gama * epsilon;
  console.log(powerConsumption); */
});

/**
 *
 * @param {string[]} arr
 * @param {number} index
 * @returns {string}
 */
function findMostCommonValue(arr, index) {
  const [ones, zeros] = countOccurences(arr, index);
  if (ones > zeros) {
    return "1";
  } else if (ones < zeros) {
    return "0";
  } else {
    return "-1";
  }
}
/**
 *
 * @param {string[]} arr
 * @param {number} index
 * @returns {string}
 */
function findLeastCommonValue(arr, index) {
  const [ones, zeros] = countOccurences(arr, index);
  if (ones > zeros) {
    return "0";
  } else if (ones < zeros) {
    return "1";
  } else {
    return "-1";
  }
}
/**
 *
 * @param {string[]} arr
 * @param {number} index
 * @returns {number[]}
 */
function countOccurences(arr, index) {
  let ones = 0;
  let zeros = 0;
  arr.forEach((v) => {
    // if (!v.charAt(index).length) {
    //   throw new Error("unbound index");
    // }
    if (v.charAt(index) === "1") {
      ones++;
    } else {
      zeros++;
    }
  });
  return [ones, zeros];
}
/**
 *
 * @param {string} binary
 * @returns {number}
 */
function toDecimal(binary) {
  return parseInt(binary, 2);
}
