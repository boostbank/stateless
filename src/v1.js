"use strict";

const HashMap = require("hashmap");
const eventListeners = new HashMap();
const EventListener = require("./library/EventListener");
const Listeners = require("./library/Listeners");
const Queue = require("./library/Queue");
const WARNING_AMOUNT = 500;

let instance = undefined;

const getInstance = () => {
  if (instance === undefined) {
    instance = new Stateless();
  }
  return instance;
};

const runDispatchQueue = dispatchQueue => {
  for (let i = 0; i < dispatchQueue.queue.length; i++) {
    const event = dispatchQueue.queue[i];
    if (getInstance().hasEvent(event.id)) {
      getInstance().dispatch(event);
      dispatchQueue.queue.splice(i, 1);
      if (i > 0) {
        i--;
      }
    }
  }
};

const runListenerQueue = listenerQueue => {
  for (let i = 0; i < listenerQueue.queue.length; i++) {
    const listener = listenerQueue.queue[i];
    if (getInstance().hasEvent(listener.eventName)) {
      getInstance().listen(
        listener.eventName,
        listener.id,
        listener.eventCallback
      );
      listenerQueue.queue.splice(i, 1);
      if (i > 0) {
        i--;
      }
    }
  }
};

class Stateless {
  /**
   * @function addEvent Adds an event to be listened to.
   * @param {string} eventName The event name.
   * @param {function} callback The callback function if async.
   */

  constructor() {
    this.dispatchQueue = new Queue();
    this.listenerQueue = new Queue();
  }

  addEvent(eventName, callback) {
    if (!eventListeners.has(eventName)) {
      eventListeners.set(eventName, new Listeners());
      if (!this.dispatchQueue.isEmpty()) {
        runListenerQueue(this.listenerQueue);
        if (this.listenerQueue.size >= WARNING_AMOUNT) {
          console.warn(
            "The listener queue is getting big and may be causing a memory leak. Does you event exist in stateless?"
          );
        }
        runDispatchQueue(this.dispatchQueue);
        if (this.dispatchQueue.size >= WARNING_AMOUNT) {
          console.warn(
            "The dispatch queue is getting big and may be causing a memory leak. Does you event exist in stateless?"
          );
        }
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

  /**
   * @function listen Subscribe to an event.
   * @param {string} eventName
   * @param {string} uid
   * @param {function} eventCallback
   * @param {function} callback
   */
  listen(eventName, uid, eventCallback, callback) {
    if (eventListeners.has(eventName)) {
      const listeners = eventListeners.get(eventName);
      if (!listeners.hasListener(uid)) {
        listeners.addListener(new EventListener(uid, eventName, eventCallback));
      }
    } else {
      this.listenerQueue.enqueue(
        new EventListener(uid, eventName, eventCallback)
      );
    }
    if (callback) {
      callback();
    }
  }

  /**
   * @function ignore UnSubscrive to an event.
   * @param {string} eventName
   * @param {string} listenerId
   * @param {string} callback
   */
  ignore(eventName, listenerId, callback) {
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

  hasQueuedDispatches() {
    return !this.dispatchQueue.isEmpty();
  }
}

var initializer = getInstance();

module.exports = initializer;
