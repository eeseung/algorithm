function solution(left, right) {
  let answer = 0;

  for (let i = left; i <= right; i++) {
    if (getDivisorCount(i) % 2 === 0) answer += i;
    else answer -= i;
  }

  return answer;
}

function getDivisorCount(num) {
  let count = 0;

  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      if (Math.sqrt(num) === i) count += 1;
      else count += 2;
    }
  }

  return count;
}

// 다른 풀이: 제곱근이 정수면 약수의 개수는 홀수
function solution(left, right) {
  let answer = 0;

  for (let i = left; i <= right; i++) {
    if (Number.isInteger(Math.sqrt(i))) answer -= i;
    else answer += i;
  }

  return answer;
}
