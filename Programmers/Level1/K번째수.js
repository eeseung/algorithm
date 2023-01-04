function solution(array, commands) {
  const answer = [];

  for (const c of commands) {
    answer.push(array.slice(c[0] - 1, c[1]).sort((a, b) => a - b)[c[2] - 1]);
  }

  return answer;
}

// 다른 풀이: map()
function solution(array, commands) {
  return commands.map(c => array.slice(c[0] - 1, c[1]).sort((a, b) => a - b)[c[2] - 1]);
}
