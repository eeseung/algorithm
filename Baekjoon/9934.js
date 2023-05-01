// 완전 이진 트리
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const K = parseInt(input[0]);
const arr = input[1].split(' ').map(Number);

function solution(k, arr) {
  const answer = Array.from({length: k}, () => []);

  function makeTree(arr, level) {
    if (arr.length === 1) {
      answer[level].push(arr[0]);
      return;
    }

    const node = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, node);
    const rightArr = arr.slice(node + 1, arr.length);

    answer[level].push(arr[node]);
    makeTree(leftArr, level + 1);
    makeTree(rightArr, level + 1);
    return;
  }
  
  makeTree(arr, 0);

  return answer.map(v => v.join(' ')).join('\n');
}

console.log(solution(K, arr));
