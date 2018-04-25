/**
 * @class EventListener
 */
class EventListener {
  /**
   * @constructor
   * @param {string} id Unique identifier for the listener.
   * @param {function} eventCallback The event callback.
   */
  constructor(id, eventCallback) {
    this.id = id;
    this.eventCallback = eventCallback;
  }
}

module.exports = EventListener;
