function solution(brown, yellow) {
  const pairs = getPairs(yellow);
  const answer = [];

  for (const [x, y] of pairs) {
    if (brown === (x * 2 + y * 2 + 4)) {
      answer.push(Math.max(x + 2, y + 2));
      answer.push(Math.min(x + 2, y + 2));
    }
  }

  return answer;
}

function getPairs(num) {
  const pairs = [];

  for (let i = 0; i <= Math.sqrt(num); i++) {
    if (num % i === 0) pairs.push([i, num / i]);
  }

  return pairs;
}
