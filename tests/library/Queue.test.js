const Queue = require("./../../src/library/Queue");

describe("Queue Tests", () => {
  it("Queue must work", () => {
    const queue = new Queue();
    queue.enqueue({ id: "test" });
    expect(queue.isEmpty()).toBe(false);
    expect(queue.size()).toBe(1);
  });
});
