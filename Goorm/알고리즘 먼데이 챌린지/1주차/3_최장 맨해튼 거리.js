const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  for await (const line of rl) {
    rl.close();
    console.log(solution(line.split(' ').map(e => parseInt(e))));
  }

  process.exit();
})();

function solution(arr) {
  const sorted = arr.sort((a, b) => a - b);

  return (Math.abs(sorted[3] - sorted[0]) + Math.abs(sorted[2] - sorted[1]));
}
