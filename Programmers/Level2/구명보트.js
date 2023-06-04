function solution(people, limit) {
  const sorted = people.sort((a, b) => b - a);
  let answer = 0;

  for (let i = 0, j = sorted.length - 1; i <= j; i++, answer++) {
    if (sorted[i] + sorted[j] <= limit) j--;
  }
  
  return answer;
}
