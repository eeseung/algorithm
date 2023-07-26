// 이진 검색 트리
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const arr = input.map(Number);

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (!this.left) this.left = new Node(value);
      else this.left.insert(value);
    } else {
      if (!this.right) this.right = new Node(value);
      else this.right.insert(value);
    }
  }
}

class Tree {
  constructor(node) {
    this.root = node;
  }

  // 후위 순회
  postorder(node, result) {
    if (node === null) return;
    this.postorder(node.left, result);
    this.postorder(node.right, result);
    result.push(node.value);
  }
}

function solution(arr) {
  const tree = new Tree(new Node(arr[0]));
  const answer = [];

  for (let i = 1; i < arr.length; i++) {
    tree.root.insert(arr[i]);
  }

  tree.postorder(tree.root, answer);

  return answer.join("\n");
}

console.log(solution(arr));
