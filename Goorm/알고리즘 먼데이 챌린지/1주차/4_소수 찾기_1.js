const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let n;

  for await (const line of rl) {
    if (n) {
      rl.close();
      console.log(solution(line.split(' ')));
    } else {
      n = parseInt(line);
    }
  }

  process.exit();
})();

function solution(arr) {
  let answer = 0;

  arr.forEach((e, i) => {
    if (isPrime(i + 1)) answer += parseInt(e);
  });

  return answer;
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
    if (n % i === 0) return false; 
  }

  return true;
}
