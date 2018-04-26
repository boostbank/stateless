/**
 * @class EventListener
 */

const { dispatch, containsEvent } = require("./../v1");

class DispatchQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(event) {
    if (event !== undefined) {
      this.queue.push(event);
    }
  }

  runQueue() {
    for (let i = 0; i < this.queue.length; i++) {
      const event = this.queue[i];
      if (containsEvent(event.id)) {
        dispatch(event);
        this.queue.splice(i, 1);
        if (i > 0) {
          i--;
        }
      }
    }
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = DispatchQueue;
