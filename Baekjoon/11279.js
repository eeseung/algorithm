// 최대 힙
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const xArr = input.slice(1).map(Number);

class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);

    let currentIdx = this.heap.length - 1;
    let parentIdx = Math.floor(currentIdx / 2);

    while (parentIdx !== 0 && this.heap[parentIdx] < value) {
      const temp = this.heap[parentIdx];

      this.heap[parentIdx] = value;
      this.heap[currentIdx] = temp;
      currentIdx = parentIdx;
      parentIdx = Math.floor(currentIdx / 2);
    }
  }

  pop() {
    const returnValue = this.heap[1];
    let currentIdx = 1;
    let leftIdx = 2;
    let rightIdx = 3;

    if (!returnValue) return 0;
    if (this.heap.length === 2) return this.heap.pop();
    this.heap[1] = this.heap.pop();

    while (
      this.heap[currentIdx] < this.heap[leftIdx] ||
      this.heap[currentIdx] < this.heap[rightIdx]
    ) { 
      if (this.heap[leftIdx] < this.heap[rightIdx]) {
        const temp = this.heap[currentIdx];

        this.heap[currentIdx] = this.heap[rightIdx];
        this.heap[rightIdx] = temp;
        currentIdx = rightIdx;
      } else {
        const temp = this.heap[currentIdx];

        this.heap[currentIdx] = this.heap[leftIdx];
        this.heap[leftIdx] = temp;
        currentIdx = leftIdx;
      }
      
      leftIdx = currentIdx * 2;
      rightIdx = currentIdx * 2 + 1;
    }

    return returnValue;
  }
}

function solution(arr) {
  const heap = new MaxHeap();
  const answer = [];
  
  for (const v of arr) {
    if (v === 0) answer.push(heap.pop());
    else heap.push(v);
  }

  return answer.join('\n');
}

console.log(solution(xArr));
