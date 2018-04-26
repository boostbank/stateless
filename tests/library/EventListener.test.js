var EventListener = require("./../../src/library/EventListener");

describe("EventListener Tests", () => {
  it("Creates an Event Listener.", () => {
    const callback = () => {};
    const listener = new EventListener("123", "test", callback);
    expect(listener.id).toBe("123");
    expect(listener.eventName).toBe("test");
    expect(listener.eventCallback).toBe(callback);
  });
});
