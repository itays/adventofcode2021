import { read } from "../utils.mjs";

read((err, data) => {
  if (err) throw err;
  const lines = data.split("\n");
  console.log(lines);
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;
  lines.forEach((line) => {
    let [dir, val] = line.split(" ");
    val = parseInt(val);
    switch (dir) {
      case "forward":
        horizontalPosition += val;
        depth += aim * val;
        break;
      case "down":
        // depth += val;
        aim += val;
        break;
      case "up":
        // depth -= val;
        aim -= val;
        break;

      default:
        break;
    }
  });
  console.log(`horizontalPosition: ${horizontalPosition}`);
  console.log(`depth: ${depth}`);
  console.log(`aim: ${aim}`);
  console.log(horizontalPosition * depth);
});
