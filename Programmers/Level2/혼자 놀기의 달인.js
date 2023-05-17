function solution(cards) {
  const visited = Array(cards.length).fill(false);
  const answer = [];
  
  function dfs(v, count) {
    visited[v] = true;
      
    if (!visited[cards[v] - 1]) dfs(cards[v] - 1, count + 1);
    else answer.push(count);
  }
  
  for (let i = 0; i < cards.length; i++) {
    if (!visited[i]) dfs(i, 1);
  }
  
  answer.sort((a, b) => b - a);
  
  return answer.length > 1 ? answer[0] * answer[1] : 0;
}
