function solution(n, wires) {
  const graph = Array.from(Array(n + 1), () => Array(n + 1).fill(false)); // 인접 행렬
  const visited = Array(n + 1).fill(false);
  let count = 1;
  let answer = n;

  for (const [v1, v2] of wires) {
    graph[v1][v2] = true;
    graph[v2][v1] = true;
  }

  function dfs(v) {
    for (let i = 1; i <= n; i++) {
      if (!visited[i] && graph[v][i]) {
        visited[v] = true;
        count++;
        dfs(i);
        visited[v] = false;
      }
    }
  }

  for (const [v1, v2] of wires) {
    count = 1;

    graph[v1][v2] = false;
    graph[v2][v1] = false;
    dfs(1);
    graph[v1][v2] = true;
    graph[v2][v1] = true;

    answer = Math.min(answer, Math.abs(n - 2 * count));
  }

  return answer;
}
