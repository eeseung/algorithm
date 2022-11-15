function solution(s) {
  let answer = 0;

  for (const bracket of s) {
    if (bracket === ')') {
      if (answer > 0) answer--;
      else return false;
    } else {
      answer++;
    }
  }

  return answer === 0;
}

// 다른 풀이
function solution(s) {
  let answer = 0;

  for (const bracket of s) {
    answer += bracket === '('? 1: -1;
    if (answer < 0) return false;
  }

  return answer === 0;
}
