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
}

function solution(bridge_length, weight, truck_weights) {
  const queue = new Queue();
  let answer = 0;

  while (queue.size() > 0 || truck_weights.length > 0) {
    answer++;
    if (queue.queue.length > 0 && answer - queue.queue[queue.front][1] === bridge_length) queue.dequeue();
    if (weight >= queue.queue.reduce((acc, cur) => acc + cur[0], 0) + truck_weights[0]) {
        queue.enqueue([truck_weights[0], answer]);
        truck_weights.splice(0, 1);
    }   
  }

  return answer;
}
