var EventListener = require("./../../lib/EventListener");

describe("EventListener Tests", () => {
  it("Creates an Event Listener.", () => {
    const callback = () => {};
    const listener = new EventListener("123", callback);
    expect(listener.id).toBe("123");
    expect(listener.eventCallback).toBe(callback);
  });
});
