function solution(citations) {
  let answer = 0;

  citations.sort();
  for (let i = 0; i <= citations[citations.length - 1]; i++) {
    if (citations.filter(e => e >= i).length >= i) answer = Math.max(answer, i);
  }

  return answer;
}

// 다른 풀이
function solution(citations) {
  return citations.sort((a, b) => b - a).filter((e, i) => e >= i + 1).length;
}
