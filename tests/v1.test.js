const Stateless = require("./../v1");

describe("Stateless v1 Tests", () => {
  beforeEach(() => {
    Stateless.clear();
  });

  it("Adds an event name to the collection.", () => {
    Stateless.addEvent("Test Event");
    expect(Stateless.containsEvent("Test Event")).toBe(true);
    Stateless.addEvent("Test Event 2");
    expect(Stateless.containsEvent("Test Event 2")).toBe(true);
  });

  it("Adds an event name to the collection async.", () => {
    Stateless.addEvent("Test Event", () => {
      expect(Stateless.containsEvent("Test Event")).toBe(true);
    });
  });

  it("Contains the same events on 2 different instances.", () => {
    Stateless.addEvent("Test Event");
    expect(Stateless.containsEvent("Test Event")).toBe(true);
    const newInstance = require("./../v1");
    expect(newInstance.containsEvent("Test Event")).toBe(true);
  });

  it("Doesn't add an event if it already exists.", () => {
    Stateless.addEvent("Test Event");
    expect(Stateless.containsEvent("Test Event")).toBe(true);
    Stateless.addEvent("Test Event");
    expect(Stateless.containsEvent("Test Event")).toBe(true);
  });

  it("Removes an event.", () => {
    Stateless.addEvent("Test Event");
    expect(Stateless.containsEvent("Test Event")).toBe(true);
    Stateless.removeEvent("Test Event");
    expect(Stateless.containsEvent("Test Event")).toBe(false);
  });

  it("Doesnt remove anything when its not there.", () => {
    Stateless.addEvent("Test Event");
    expect(Stateless.containsEvent("Test Event")).toBe(true);
    Stateless.removeEvent("Test Event 2");
    expect(Stateless.containsEvent("Test Event")).toBe(true);
  });

  it("Removes an event async.", () => {
    Stateless.addEvent("Test Event");
    expect(Stateless.containsEvent("Test Event")).toBe(true);
    Stateless.removeEvent("Test Event", () => {
      expect(Stateless.containsEvent("Test Event")).toBe(false);
    });
  });

  it("Contains async", () => {
    Stateless.addEvent("Test Event");
    Stateless.containsEvent("Test Event", contains => {
      expect(contains).toBe(true);
    });
  });

  it("Clears all events.", () => {
    Stateless.addEvent("Test Event");
    expect(Stateless.containsEvent("Test Event")).toBe(true);
    Stateless.addEvent("Test Event 2");
    expect(Stateless.containsEvent("Test Event 2")).toBe(true);
    Stateless.clear();
    expect(Stateless.containsEvent("Test Event")).toBe(false);
    expect(Stateless.containsEvent("Test Event 2")).toBe(false);
  });

  it("Clears all events. Async", () => {
    Stateless.addEvent("Test Event");
    expect(Stateless.containsEvent("Test Event")).toBe(true);
    Stateless.addEvent("Test Event 2");
    expect(Stateless.containsEvent("Test Event 2")).toBe(true);
    Stateless.clear(() => {
      expect(Stateless.containsEvent("Test Event")).toBe(false);
      expect(Stateless.containsEvent("Test Event 2")).toBe(false);
    });
  });

  it("throws an event", () => {
    let throwEvent = undefined;
    Stateless.addEvent("Test Event");
    const listener = {
      id: "123",
      eventCallback: event => {
        throwEvent = event;
        expect(event).not.toBe(undefined);
        expect(event.id).toBe("Test Event");
        expect(event.payload).toBe("data");
      }
    };
    Stateless.subscribe("Test Event", listener);
    const event = {
      id: "Test Event",
      payload: "data"
    };
    Stateless.throwEvent(event);
    expect(throwEvent).not.toBe(undefined);
  });
  it("Doesnt throw when unsubscribing", () => {
    let throwEvent = undefined;
    Stateless.addEvent("Test Event");
    const listener = {
      id: "123",
      eventCallback: event => {
        throwEvent = event;
        expect(event).not.toBe(undefined);
        expect(event.id).toBe("Test Event");
        expect(event.payload).toBe("data");
      }
    };
    Stateless.subscribe("Test Event", listener);
    const event = {
      id: "Test Event",
      payload: "data"
    };
    Stateless.throwEvent(event);
    expect(throwEvent).not.toBe(undefined);
    throwEvent = undefined;
    Stateless.unsubscribe("Test Event", "123");
    expect(throwEvent).toBe(undefined);
  });
});
