const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let n, k;
  const arr = [];

  for await (const line of rl) {
    if (n) {
      arr.push(line.split(' '));
      if (arr.length === n) rl.close();
    } else {
      [n, k] = line.split(' ');
      n = parseInt(n);
    }
  }

  console.log(solution(arr, k));
  process.exit();
})();

function solution(arr, k) {
  arr.sort((a, b) => {
    if (a[0] > b[0]) return 1;
    else if (a[0] < b[0]) return -1;
    else return a[1] - b[1];
  });

  return arr[k - 1].join(' ');
}
