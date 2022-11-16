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
}

function solution(priorities, location) {
  const queue = new Queue();
  let answer = 0;

  for (let i = 0; i < priorities.length; i++) {
    queue.enqueue([priorities[i], location === i]);
  }

  while (true) {
    if (queue.queue.some(e => e[0] > queue.queue[queue.front][0])) {
      queue.enqueue(queue.dequeue());
    } else {
      answer++;
      if (queue.queue[queue.front][1]) return answer;
      else queue.dequeue();
    }
  }
}
