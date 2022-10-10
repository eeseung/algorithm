const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let n;

  for await (const line of rl) {
    if (n) {
      rl.close();
      console.log(solution(n, line.split(' ')));
    } else {
      n = parseInt(line);
    }
  }

  process.exit();
})();

function solution(n, arr) {
  const primes = getPrimes(n + 1);
  let answer = 0;

  primes.forEach(i => answer += parseInt(arr[i - 1]));

  return answer;
}

function getPrimes(n) {
  const prime = [false, false, ...Array(n - 1).fill(true)];

  for (let i = 2; i * i <= n; i += 1) {
    if (prime[i]) {
      for (let j = i * 2; j <= n; j += i) {
        prime[j] = false;
      }
    }
  }

  return [...Array(n).keys()].filter(i => prime[i]);
}
