// 강의실 배정
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
      [this.heap[curIdx], this.heap[parIdx]] = [this.heap[parIdx], this.heap[curIdx]];
      curIdx = parIdx;
      parIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    const returnValue = this.heap[1];
    if (this.heap.length === 2) return this.heap.pop();
    this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = 2;
    let rightIdx = 3;

    while (
      this.heap[curIdx] > this.heap[leftIdx] ||
      this.heap[curIdx] > this.heap[rightIdx]
    ) {
      if (this.heap[leftIdx] > this.heap[rightIdx]) {
        [this.heap[curIdx], this.heap[rightIdx]] = [this.heap[rightIdx], this.heap[curIdx]];
        curIdx = rightIdx;
      } else {
        [this.heap[curIdx], this.heap[leftIdx]] = [this.heap[leftIdx], this.heap[curIdx]];
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

function solution(N, arr) {
  const sorted = arr.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  const minHeap = new MinHeap();

  minHeap.push(sorted[0][1]);

  for (let i = 1; i < N; i++) {
    const [s, t] = sorted[i];
    const startTime = minHeap.pop();

    if (startTime > s) minHeap.push(startTime);
    minHeap.push(t);
  }

  return minHeap.size();
}

console.log(solution(N, arr));
