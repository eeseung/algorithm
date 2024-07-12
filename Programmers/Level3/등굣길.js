function solution(m, n, puddles) {
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (const [pm, pn] of puddles) {
    dp[pn][pm] = -1;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (dp[i][j] === -1) continue;
      if (i === 1 && j === 1) dp[i][j] = 1;
      else if (dp[i - 1][j] !== -1 && dp[i][j - 1] !== -1)
        dp[i][j] = (dp[i][j - 1] % 1000000007) + (dp[i - 1][j] % 1000000007);
      else if (dp[i - 1][j] >= 0 && dp[i][j - 1] === -1) dp[i][j] = dp[i - 1][j];
      else if (dp[i - 1][j] === -1 && dp[i][j - 1] >= 0) dp[i][j] = dp[i][j - 1];
    }
  }

  return dp[n][m];
}
