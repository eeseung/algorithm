// 트리의 높이와 너비
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const arr = input.slice(1).map((v) => v.split(' ').map(Number));

function solution(N, arr) {
  const tree = Array.from({ length: N + 1 }, () => []);
  const nodeCount = Array.from({ length: N + 1 }, () => 0);
  const grid = Array.from({ length: N + 1 }, () => []);
  let column = 1;
  const answer = [0, 0];

  for (const [node, left, right] of arr) {
    tree[node].push(left);
    tree[node].push(right);
    nodeCount[node]++;
    nodeCount[left]++;
    nodeCount[right]++;
  }

  const root = nodeCount.findIndex((v) => v === 1);

  function inorder(depth, node) {
    const [left, right] = tree[node];
    if (left > 0) inorder(depth + 1, left);
    grid[depth].push(column++);
    if (right > 0) inorder(depth + 1, right);
  }

  inorder(1, root);
  grid.forEach((row, i) => {
    if (!row.length) return;
    const width = Math.max(...row) - Math.min(...row) + 1;
    if (width > answer[1]) {
      answer[0] = i;
      answer[1] = width;
    }
  });

  return answer.join(' ');
}

console.log(solution(N, arr));
