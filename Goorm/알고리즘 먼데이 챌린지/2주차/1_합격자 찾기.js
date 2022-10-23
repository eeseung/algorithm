const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let n;
  let count = 0;
  const arr = [];

  for await (const line of rl) {
    if (n) {
      if (count % 2 === 1) arr.push(line);
      count++;
      if (arr.length === n * 2) rl.close();
    } else {
      n = parseInt(line);
    }
  }

  console.log(solution(arr));
  process.exit();
})();

function solution(arr) {
  let answer = '';

  for (const list of arr) {
    const scores = list.trim().split(' ').map(Number);
    const average = scores.reduce((acc, cur) => acc + cur, 0) / scores.length;
    const pass = scores.filter(e => e >= average).length;

    answer += `${pass}/${scores.length}\n`;
  }

  return answer;
}
