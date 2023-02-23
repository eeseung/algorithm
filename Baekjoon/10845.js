// 큐
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.queue[this.rear++] = value;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }

  size() {
    return this.rear - this.front;
  }

  isEmpty() {
    return this.front >= this.rear;
  }

  peek() {
    return this.queue[this.front];
  }

  back() {
    return this.queue[this.rear - 1];
  }
}

function solution(arr) {
  const queue = new Queue();
  const answer = [];

  for (const command of arr) {
    const c = command.split(' ');

    if (c[0] === 'push') queue.enqueue(c[1]);
    if (c[0] === 'pop') answer.push(queue.isEmpty() ? -1 : queue.dequeue());
    if (c[0] === 'size') answer.push(queue.size());
    if (c[0] === 'empty') answer.push(queue.isEmpty() ? 1 : 0);
    if (c[0] === 'front') answer.push(queue.isEmpty() ? -1 : queue.peek());
    if (c[0] === 'back') answer.push(queue.isEmpty() ? -1 : queue.back());
  }

  return answer.join('\n');
}

console.log(solution(input.slice(1)));
