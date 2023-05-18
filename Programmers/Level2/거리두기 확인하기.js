function checkDistance(arr) {
  let result = true; // 모든 응시자가 거리두기를 지키고 있는지
  const visited = Array.from({length: 5}, () => Array(5).fill(false));
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  
  function dfs(x, y, count) {
      visited[x][y] = true;
      if (count === 2) return;
      
      for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];
          
          if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5 && !visited[nx][ny]) {
              if (arr[nx][ny] === 'O') dfs(nx, ny, count + 1); 
              else if (arr[nx][ny] === 'P') result = false;
          }
      }
  }
  
  for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
          if (arr[r][c] === 'P' && !visited[r][c]) dfs(r, c, 0);
      }
  }
  
  return result;
}

function solution(places) {
  const answer = [];
  
  for (const place of places) {
      answer.push(checkDistance(place) ? 1 : 0);
  }
  
  return answer;
}
