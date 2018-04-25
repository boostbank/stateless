/**
 * @class Listeners
 */
class Listeners {
  /**
   * @constructor Creates a Listeners object.
   */
  constructor() {
    this.listeners = [];
  }

  /**
   * @function addListener Adds a listener.
   * @param {listener} listener
   */
  addListener(listener) {
    if (listener && listener.id) {
      if (!this.hasListener(listener.id)) {
        this.listeners.push(listener);
      }
    }
  }

  /**
   * @function removeListener Removes a listener.
   * @param {string} id
   */
  removeListener(id) {
    for (let i = 0; i < this.listeners.length; i++) {
      const listener = this.listeners[i];
      if (id === listener.id) {
        this.listeners.splice(i, 1);
        i = this.listeners.length;
      }
    }
  }

  /**
   * @function notify Notifies a listener.
   * @param {event} event
   */
  notify(event) {
    for (let i = 0; i < this.listeners.length; i++) {
      const listener = this.listeners[i];
      listener.eventCallback(event);
    }
  }

  /**
   * @function hasListener Checks if listener exists.
   * @param {string} id
   */
  hasListener(id) {
    let hasListener = false;

    for (let i = 0; i < this.listeners.length; i++) {
      const listener = this.listeners[i];
      hasListener = listener.id === id;
      if (hasListener) {
        i = this.listeners.length;
      }
    }

    return hasListener;
  }
}

module.exports = Listeners;
