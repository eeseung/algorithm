// 단절점과 단절선
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const nArr = input.slice(1, N).map(v => v.split(' ').map(Number));
const qArr = input.slice(N + 1).map(v => v.split(' ').map(Number));

function solution(N, nArr, qArr) {
  const tree = Array.from({length: N + 1}, () => []);
  const answer = [];

  for (const [a, b] of nArr) {
    tree[a].push(b);
    tree[b].push(a);
  }

  for (const [t, k] of qArr) {
    if (t === 1) answer.push(tree[k].length > 1 ? 'yes' : 'no');
    else if (t === 2) answer.push('yes');
  }

  return answer.join('\n');
}

console.log(solution(N, nArr, qArr));
