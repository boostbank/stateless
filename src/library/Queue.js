class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(event) {
    if (event !== undefined) {
      this.queue.push(event);
    }
  }

  size(){
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = Queue;
