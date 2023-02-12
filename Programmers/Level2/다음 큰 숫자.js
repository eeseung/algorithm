function solution(n) {
  const count = n.toString(2).split("1").length - 1;
  let next = ++n;
  let answer = 0;

  while (true) {
    const nextCount = next.toString(2).split("1").length - 1;

    if (count === nextCount) {
      answer = next;
      break;
    }
    next++;
  }

  return answer;
}

// 다른 풀이: 정규식 + 재귀
function solution(n, a = n + 1) {
  return n.toString(2).match(/1/g).length == a.toString(2).match(/1/g).length ? a : solution(n, a + 1);
}
