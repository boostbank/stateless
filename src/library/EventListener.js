class EventListener {
  constructor(id, eventName, eventCallback) {
    this.id = id;
    this.eventName = eventName;
    this.eventCallback = eventCallback;
  }
}

module.exports = EventListener;
