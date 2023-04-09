function solution(n, wires) {
  const visited = Array.from(Array(n + 1).fill(false));
  let graph = Array.from(Array(n + 1), () => []);
  let answer = Infinity;

  function dfs(v, count) {
    visited[v] = true;
    count++;

    for (const next of graph[v]) {
      if (!visited[next]) count = dfs(next, count);
    }

    return count;
  }

  // 전선 하나씩 끊으면서 두 전력망 송전탑 개수의 차이 구함
  for (let i = 0; i < n - 1; i++) {
    const wireArr = wires.filter((v, idx) => idx !== i);

    for (const [src, dest] of wireArr) {
      graph[src].push(dest);
      graph[dest].push(src);
    }

    const count = dfs(1, 0); // 송전탑 개수
    answer = Math.min(answer, Math.abs(n - 2 * count));
    graph = Array.from(Array(n + 1), () => []);
    visited.fill(false);
  }

  return answer;
}
