// 1로 만들기
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function solution(n) {
  const dp = Array.from({length: n + 1}).fill(0);

  for (let i = 2; i <= n; i++) {
    const nums = [];

    if (i % 3 === 0) nums.push(dp[i / 3] + 1);
    if (i % 2 === 0) nums.push(dp[i] = dp[i / 2] + 1);
    nums.push(dp[i - 1] + 1);

    dp[i] = Math.min(...nums);
  }

  return dp[n];
}

console.log(solution(parseInt(input)));
