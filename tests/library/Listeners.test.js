const Listeners = require("./../../src/library/Listeners");

describe("Listeners Tests", () => {
  it("Creates an Listeners Class.", () => {
    const listeners = new Listeners();
    expect(listeners).not.toBe(undefined);
  });
  it("Adds a listener", () => {
    const listeners = new Listeners();
    expect(listeners).not.toBe(undefined);
    listeners.addListener({ id: "123", eventCallback: () => {} });
    expect(listeners.hasListener("123")).toBe(true);
  });

  it("Removes a listener", () => {
    const listeners = new Listeners();
    expect(listeners).not.toBe(undefined);
    listeners.addListener({ id: "123", eventCallback: () => {} });
    expect(listeners.hasListener("123")).toBe(true);
    listeners.removeListener("123");
    expect(listeners.hasListener("123")).toBe(false);
  });
});
