const Stateless = require("./../../src/v1");

describe("DispatchQueue Tests", () => {
  it("Throws event later", () => {
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
    };
  });
});
