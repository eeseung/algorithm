const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let n, k;
  const arr = [];

  for await (const line of rl) {
    if (k) {
      arr.push(line);
      if (arr.length === k) rl.close();
    } else {
      [n, k] = line.split(' ').map(Number);
    }
  }

  console.log(solution(n, arr));
  process.exit();
})();

function solution(n, arr) {
  const da = [0, 0 ,0, 1, -1];
  const db = [0, 1, -1, 0, 0];
  let matrix = Array.from(Array(n + 1), () => Array(n + 1).fill(0));
  let answer = 0;

  for (const location of arr) {
    const [a, b] = location.split(' ').map(e => parseInt(e));

    for (let i = 0; i < 5; i++) {
      const na = a + da[i];
      const nb = b + db[i];

      if (n >= na && na > 0 && n >= nb && nb > 0) matrix[na][nb]++;
    }
  }

  for (const mat of matrix) {
    answer += mat.reduce((acc, cur) => acc + cur, 0);
  }

  return answer;
}
