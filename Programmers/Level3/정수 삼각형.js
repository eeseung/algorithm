function solution(triangle) {
  const dp = triangle.map((v) => [...v]);

  dp[1][0] = dp[0][0] + dp[1][0];
  dp[1][1] = dp[0][0] + dp[1][1];

  for (let i = 2; i <= triangle.length - 1; i++) {
    for (let j = 0; j <= i; j++) {
      const left = dp[i - 1][j - 1] ?? 0;
      const right = dp[i - 1][j] ?? 0;
      dp[i][j] += Math.max(left, right);
    }
  }

  return Math.max(...dp[triangle.length - 1]);
}
