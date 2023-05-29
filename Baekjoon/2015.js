// 수들의 합 4
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, K] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

function solution(N, K, arr) {
  const sum = Array.from({length: N + 1}).fill(0);
  const obj = {};
  let answer = 0;

  for (let i = 1; i <= N; i++) {
    sum[i] = sum[i - 1] + arr[i - 1];
    if (sum[i] === K) answer++;
  }

  for (let i = 1; i <= N; i++) {
    if (obj[sum[i] - K]) answer += obj[sum[i] - K];
    
    if (obj[sum[i]]) obj[sum[i]]++;
    else obj[sum[i]] = 1;
  }

  return answer;
}

console.log(solution(N, K, arr));
