function solution(s) {
  const arr = s.split(' ').map(e => e ? e[0].toUpperCase() + e.slice(1).toLowerCase() : '');
  const answer = arr.join(' ');
  
  return answer;
}
