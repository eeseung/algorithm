function solution(n) {
  const dp = Array(n + 1).fill(0);
  dp[1] = 1n;
  dp[2] = 2n;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n] % 1234567n;
}
