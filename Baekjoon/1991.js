// 트리 순회
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split(' '));

function solution(n, arr) {
  const tree = {};
  const answer = ['', '', ''];

  for (let i = 0; i < n; i++) {
    const [node, left, right] = arr[i];
    tree[node] = [left, right];
  }

  function preorder(node) {
    if (node === '.') return;
    const [left, right] = tree[node];
    answer[0] += node;
    preorder(left);
    preorder(right);
  }
  
  function inorder(node) {
    if (node === '.') return;
    const [left, right] = tree[node];
    inorder(left);
    answer[1] += node;
    inorder(right);
  }
  
  function postorder(node) {
    if (node === '.') return;
    const [left, right] = tree[node];
    postorder(left);
    postorder(right);
    answer[2] += node;
  }

  preorder('A');
  inorder('A');
  postorder('A');

  return answer.join('\n');
}

console.log(solution(n, arr));
