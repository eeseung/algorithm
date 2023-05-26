// 최소 회의실 개수
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

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    const returnValue = this.heap[1];
    if (this.heap.length === 2) return this.heap.pop();
    this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1; 

    while (this.heap[curIdx] > this.heap[leftIdx] || this.heap[curIdx] > this.heap[rightIdx]) {
      if (this.heap[leftIdx] > this.heap[rightIdx]) {
        this.swap(curIdx, rightIdx);
        curIdx = rightIdx;
      } else {
        this.swap(curIdx, leftIdx);
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
  const minHeap = new MinHeap(); // 최소 힙, 종료 시간 넣음

  minHeap.push(sorted[0][1]);

  for (let i = 1; i < N; i++) {
    const [start, finish] = sorted[i];
    const finishTime = minHeap.pop(); // 가장 빨리 끝나는 회의 시간

    // 회의 시작 시간이 더 빠르면 다른 회의실이어야 하므로 다시 힙에 넣음
    if (finishTime > start) minHeap.push(finishTime);
    minHeap.push(finish);
  }

  return minHeap.size();
}

console.log(solution(N, arr));
