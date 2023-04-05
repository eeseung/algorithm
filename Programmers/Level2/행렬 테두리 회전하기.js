function solution(rows, columns, queries) {
  const graph = [...Array(rows)].map((_, r) =>[...Array(columns)].map((_, c) => (r * columns) + (c + 1)));
  const answer = [];
  
  for (const q of queries) {
      const origin = graph.map(v => [...v]); // 2차원 배열 깊은 복사
      let min = Infinity;

      // 행 이동
      for (let i = 0; i < q[3] - q[1]; i++) {
          graph[q[0] - 1][q[1] + i] = origin[q[0] - 1][q[1] - 1 + i];
          graph[q[2] - 1][q[1] - 1 + i] = origin[q[2] - 1][q[1] + i];
          min = Math.min(min, graph[q[0] - 1][q[1] + i]);
          min = Math.min(min, graph[q[2] - 1][q[1] - 1 + i]);
      }
      
      // 열 이동
      for (let i = 0; i < q[2] - q[0]; i++) {
          graph[q[0] - 1 + i][q[1] - 1] = origin[q[0] + i][q[1] - 1];
          graph[q[0] + i][q[3] - 1] = origin[q[0] - 1 + i][q[3] - 1];
          min = Math.min(min, graph[q[0] - 1 + i][q[1] - 1]);
          min = Math.min(min, graph[q[0] + i][q[3] - 1]);
      }
      
      answer.push(min);
  }
  
  return answer;
}
