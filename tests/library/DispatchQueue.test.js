const Stateless = require("./../../src/stateless");

describe("DispatchQueue Tests", () => {
  it("Throws event later", () => {
    let thrownEvent = undefined;
    expect(Stateless.hasEvent("test")).toBe(false);
    const passingEvent = {
      id: "test",
      payload: "test"
    };
    Stateless.dispatch(passingEvent);
    expect(Stateless.hasQueuedDispatches()).toBe(true);
    const callback = event => {
      expect(event.id).toBe(passingEvent.id);
      expect(event.payload).toBe(passingEvent.payload);
      thrownEvent = event;
    };
    Stateless.listen("test", "123", callback);
    Stateless.addEvent("test");
    expect(thrownEvent).not.toBe(undefined);
  });
});
