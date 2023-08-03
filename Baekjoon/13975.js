// 파일 합치기 3
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const T = parseInt(input[0]);

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
      [this.heap[curIdx], this.heap[parIdx]] = [
        this.heap[parIdx],
        this.heap[curIdx],
      ];
      curIdx = parIdx;
      parIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    if (this.heap.length === 2) return this.heap.pop();
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = 2;
    let rightIdx = 3;

    while (
      this.heap[curIdx] > this.heap[leftIdx] ||
      this.heap[curIdx] > this.heap[rightIdx]
    ) {
      if (this.heap[leftIdx] > this.heap[rightIdx]) {
        [this.heap[curIdx], this.heap[rightIdx]] = [
          this.heap[rightIdx],
          this.heap[curIdx],
        ];
        curIdx = rightIdx;
      } else {
        [this.heap[curIdx], this.heap[leftIdx]] = [
          this.heap[leftIdx],
          this.heap[curIdx],
        ];
        curIdx = leftIdx;
      }
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return returnValue;
  }

  size() {
    return this.heap.length - 1;
  }
}

function solution(arr) {
  const minHeap = new MinHeap();
  let answer = 0;

  for (const size of arr) {
    minHeap.push(size);
  }

  while (minHeap.size() > 1) {
    const cost = minHeap.pop() + minHeap.pop();
    answer += cost;
    minHeap.push(cost);
  }

  return answer;
}

for (let i = 0; i < T * 2; i += 2) {
  const arr = input[i + 2].split(" ").map(Number);
  console.log(solution(arr));
}
