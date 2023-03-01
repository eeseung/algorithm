function solution(n, computers) {
  const visited = Array.from(Array(n).fill(false));
  let answer = 0;

  function dfs(v) {
    visited[v] = true;
    for (let i = 0; i < n; i++) {
      if (computers[v][i] === 1 && !visited[i]) {
        dfs(i);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      answer++;
    }
  }

  return answer;
}
