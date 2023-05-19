// 최소 스패닝 트리
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [V, E] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.heap[parIdx]?.weight > this.heap[curIdx]?.weight) {
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

    while (this.heap[curIdx]?.weight > this.heap[leftIdx]?.weight || this.heap[curIdx]?.weight > this.heap[rightIdx]?.weight) {
      if (this.heap[leftIdx]?.weight > this.heap[rightIdx]?.weight) {
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

function solution(V, E, arr) {
  const graph = Array.from({length: V + 1}, () => []);
  const visited = Array(V + 1).fill(false);
  let answer = 0;

  for (let i = 0; i < E; i++) {
    graph[arr[i][0]].push({vertex: arr[i][1], weight: arr[i][2]});
    graph[arr[i][1]].push({vertex: arr[i][0], weight: arr[i][2]});
  }

  function prim(v) {
    const minHeap = new MinHeap();
  
    visited[v] = true;

    for (let i = 0; i < graph[v].length; i++) {
      minHeap.push(graph[v][i]);
    }

    while (minHeap.size() > 0) {
      const cur = minHeap.pop();

      if (visited[cur.vertex]) continue;
      visited[cur.vertex] = true;
      answer += cur.weight;

      for (let i = 0; i < graph[cur.vertex].length; i++) {
        minHeap.push(graph[cur.vertex][i]);
      }
    }
  }

  prim(1);

  return answer;
}

console.log(solution(V, E, arr));
