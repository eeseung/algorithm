// 회전 초밥
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, _, k, c] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(Number);

function solution(N, k, c, arr) {
  const seq = {}; // 초밥 종류별 개수
  let start = 0, end = k - 1;
  let count = 0;
  let answer = 0;

  for (const s of arr.slice(0, k)) {
    if (seq[s]) seq[s]++;
    else {
      seq[s] = 1;
      count++;
      answer++;
    }
  }

  while (start < N) {
    if (seq[arr[start]] === 1) count--;
    seq[arr[start]]--;

    start++;
    end++;

    if (end === N) end = 0;
    if (seq[arr[end]]) seq[arr[end]]++;
    else {
      seq[arr[end]] = 1;
      count++;
    }

    answer = Math.max(answer, count + !seq[c]);
  }

  return answer;
}

console.log(solution(N, k, c, arr));
