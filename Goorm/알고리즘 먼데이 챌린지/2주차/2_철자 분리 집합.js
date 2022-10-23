const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let n;

  for await (const line of rl) {
    if (n) {
      rl.close();
      console.log(solution(line));
    } else {
      n = line;
    }
  }

  process.exit();
})();

function solution(str) {
  let answer = 0;

  for (let i = 1; i <= str.length; i++) {
    if (str[i] !== str[i - 1]) answer++;
  }

  return answer;
}
