"use strict";

const HashMap = require("hashmap");
const eventListeners = new HashMap();
const EventListener = require("./library/EventListener");
const Listeners = require("./library/Listeners");
const Queue = require("./library/Queue");
const WARNING_AMOUNT = 100;

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

/**
 * @module Stateless
 */
class Stateless {
  constructor() {
    this.dispatchQueue = new Queue();
    this.listenerQueue = new Queue();
  }

  /**
   * @function addEvent
   * @param {string} eventName The event you want to add.
   * @param {function} callback Optional async callback.
   */
  addEvent(eventName, callback) {
    if (!eventListeners.has(eventName)) {
      eventListeners.set(eventName, new Listeners());
      if (!getInstance().dispatchQueue.isEmpty()) {
        runListenerQueue(getInstance().listenerQueue);
        if (getInstance().listenerQueue.size >= WARNING_AMOUNT) {
          console.warn(
            "The listener queue is getting big and may be causing a memory leak. Does your event exist in stateless?"
          );
        }
        runDispatchQueue(getInstance().dispatchQueue);
        if (getInstance().dispatchQueue.size >= WARNING_AMOUNT) {
          console.warn(
            "The dispatch queue is getting big and may be causing a memory leak. Does your event exist in stateless?"
          );
        }
      }
    }
    if (callback) {
      callback();
    }
  }

  /**
   * @function hasEvent
   * @param {string} eventName The event name you want to see exists.
   * @param {function} callback Optional async callback.
   */
  hasEvent(eventName, callback) {
    if (callback) {
      callback(eventListeners.has(eventName));
    }
    return eventListeners.has(eventName);
  }

  /**
   * @function removeEvent
   * @param {string} eventName The event you want to remove.
   * @param {function} callback Optional async callback.
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
   * @function clear
   * @param {function} callback Optional async callback.
   */
  clear(callback) {
    eventListeners.clear();
    if (callback) {
      callback();
    }
  }

  /**
   * @function listen
   * @param {string} eventName The event you want to subscribe to.
   * @param {string} uid Unique identifier for the listener.
   * @param {function} eventCallback Callback function for the statless event system to fire on a dispatch.
   * @param {function} callback Optional async callback.
   */
  listen(eventName, uid, eventCallback, callback) {
    if (eventListeners.has(eventName)) {
      const listeners = eventListeners.get(eventName);
      if (!listeners.hasListener(uid)) {
        listeners.addListener(new EventListener(uid, eventName, eventCallback));
      }
    } else {
      getInstance().listenerQueue.enqueue(
        new EventListener(uid, eventName, eventCallback)
      );
    }
    if (callback) {
      callback();
    }
  }

  /**
   * @function ignore
   * @param {string} eventName The event name you want to unsubscribe from.
   * @param {string} listenerId Unique listener id to remove.
   * @param {string} callback Optional async callback.
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

  /**
   * @function dispatch
   * @param {object} event The event to dispatch to the listeners.
   */
  dispatch(event) {
    if (event && event.id) {
      if (eventListeners.has(event.id)) {
        const listeners = eventListeners.get(event.id);
        listeners.notify(event);
      } else {
        getInstance().dispatchQueue.enqueue(event);
      }
    } else {
      throw new Error("Event must not be null and have an ID!");
    }
  }

  /**
   * @function hasQueuedDispatches
   */
  hasQueuedDispatches() {
    return !getInstance().dispatchQueue.isEmpty();
  }
}

var initializer = getInstance();

module.exports = initializer;
