function solution(k, dungeons) {
  const visited = Array(dungeons.length).fill(false);
  let answer = 0;

  function dfs(hp, count) {
    answer = Math.max(answer, count);

    for (let i = 0; i < dungeons.length; i++) {
      if (!visited[i] && hp >= dungeons[i][0]) {
        visited[i] = true;
        dfs(hp - dungeons[i][1], count + 1);
        visited[i] = false;
      }
    }
  }

  dfs(k, 0);

  return answer;
}
