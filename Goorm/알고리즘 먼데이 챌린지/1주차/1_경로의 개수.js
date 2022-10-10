const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let n;

  for await (const line of rl) {
    if (n) {
      rl.close();
      console.log(solution(line));
    } else {
      n = parseInt(line);
    }
  }

  process.exit();
})();

function solution(arr) {
  let answer = 1;

  arr.split(" ").forEach((e) => (answer *= e));

  return BigInt(answer).toString();
}
