// 부분합
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, S] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

function solution(N, S, arr) {
  const sum = Array.from({length: N + 1}).fill(0);
  let start = 0, end = 0;
  let answer = Infinity;

  for (let i = 1; i <= N; i++) {
    sum[i] = sum[i - 1] + arr[i - 1];
  }

  while (start <= N && end <= N) {
    if (sum[end] - sum[start] < S) end++;
    else {
      answer = Math.min(answer, end - start);
      start++;
    }
  }

  return answer === Infinity ? 0 : answer;
}

console.log(solution(N, S, arr));
