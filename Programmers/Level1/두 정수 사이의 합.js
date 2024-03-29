function solution(a, b) {
  let answer = 0;

  for (let i = Math.min(a, b); i <= Math.max(a, b); i++) {
    answer += i;
  }

  return answer;
}

// 다른 풀이: 가우스 공식
function solution(a, b) {
  return (a + b) * (Math.abs(b - a) + 1) / 2;
}
