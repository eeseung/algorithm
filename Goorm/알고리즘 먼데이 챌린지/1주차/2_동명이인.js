const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let n, s;
  const arr = [];

  for await (const line of rl) {
    if (n) {
      arr.push(line);
      if (arr.length === n) rl.close();
    } else {
      [n, s] = line.split(' ');
      n = parseInt(n);
    }
  }

  console.log(solution(s, arr));
  process.exit();
})();

function solution(str, arr) {
  let answer = 0;

  for (const name of arr) {
    if (name.includes(str)) answer++;
  }

  return answer;
}
