"use strict";

const HashMap = require("hashmap");
const eventListeners = new HashMap();
const EventListener = require("./library/EventListener");
const Listeners = require("./library/Listeners");
const DispatchQueue = require("./library/DispatchQueue");

let instance = undefined;

const getInstance = () => {
  if (instance === undefined) {
    instance = new Stateless();
  }
  return instance;
};

class Stateless {
  /**
   * @function addEvent Adds an event to be listened to.
   * @param {string} eventName The event name.
   * @param {function} callback The callback function if async.
   */

  constructor() {
    this.dispatchQueue = new DispatchQueue();
  }

  addEvent(eventName, callback) {
    if (!eventListeners.has(eventName)) {
      eventListeners.set(eventName, new Listeners());
      if (!this.dispatchQueue.isEmpty()) {
        this.dispatchQueue.runQueue();
      }
    }
    if (callback) {
      callback();
    }
  }

  /**
   * @function hasEvent Returns if the system contains the event by name.
   * @param {string} eventName The event name.
   * @param {function} callback The callback function if async.
   */
  hasEvent(eventName, callback) {
    if (callback) {
      callback(eventListeners.has(eventName));
    }
    return eventListeners.has(eventName);
  }

  /**
   * @function removeEvent Removes an event.
   * @param {string} eventName
   * @param {function} callback
   */
  removeEvent(eventName, callback) {
    if (eventListeners.has(eventName)) {
      eventListeners.remove(eventName);
    }
    if (callback) {
      callback();
    }
  }

  /**
   * @function clear Clears events and their listeners.
   * @param {function} callback Callback function.
   */
  clear(callback) {
    eventListeners.clear();
    if (callback) {
      callback();
    }
  }

  subscribe(eventName, listener, callback) {
    if (eventListeners.has(eventName)) {
      const listeners = eventListeners.get(eventName);
      if (!listeners.hasListener(listener.id)) {
        listeners.addListener(listener);
      }
    }
    if (callback) {
      callback();
    }
  }

  unsubscribe(eventName, listenerId, callback) {
    if (eventListeners.has(eventName)) {
      const listeners = eventListeners.get(eventName);
      if (listeners.hasListener(listenerId)) {
        listeners.removeListener(listenerId);
      }
    }
    if (callback) {
      callback();
    }
  }

  dispatch(event) {
    if (event && event.id) {
      if (eventListeners.has(event.id)) {
        const listeners = eventListeners.get(event.id);
        listeners.notify(event);
      } else {
        this.dispatchQueue.enqueue(event);
      }
    } else {
      throw new Error("Event must not be null and have an ID!");
    }
  }

  createListener(id, callback) {
    return new EventListener(id, callback);
  }

  hasQueuedDispatches() {
    return !this.dispatchQueue.isEmpty();
  }
}

var initializer = getInstance();

module.exports = initializer;
