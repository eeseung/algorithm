function solution(k, tangerine) {
  const sorted = tangerine.sort((a, b) => a - b);
  const counts = {};
  let count = 0;
  let answer = 0;
  
  for (const s of sorted) {
    if (counts[s]) counts[s]++;
    else counts[s] = 1;
  }

  for (const t of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    count += t[1];
    answer++;
    if (count >= k) break;
  }
  
  return answer;
}
