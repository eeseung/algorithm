function solution(price, money, count) {
  const answer = Array.from({length: count}).fill(price).reduce((acc, cur, i) => acc + cur * (i + 1), 0) - money;

  return answer > 0 ? answer : 0;
}

// 다른 풀이: 가우스 공식
function solution(price, money, count) {
  const answer = price * count * (count + 1) / 2 - money;

  return answer > 0 ? answer : 0;
}
