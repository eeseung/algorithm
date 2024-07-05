function solution(routes) {
  let start = -30001;
  let answer = 0;

  routes.sort((a, b) => a[1] - b[1]);

  for (const [rStart, rEnd] of routes) {
    if (rEnd >= start && start < rStart) {
      start = rEnd;
      answer++;
    }
  }

  return answer;
}
