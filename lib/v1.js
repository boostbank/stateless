"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HashMap = require("hashmap");
var eventListeners = new HashMap();
var EventListener = require("./../library/EventListener");
var Listeners = require("./../library/Listeners");
var instance = undefined;

var getInstance = function getInstance() {
  if (instance === undefined) {
    instance = new Stateless();
  }
  return instance;
};

var Stateless = function () {
  function Stateless() {
    _classCallCheck(this, Stateless);
  }

  _createClass(Stateless, [{
    key: "addEvent",

    /**
     * @function addEvent Adds an event to be listened to.
     * @param {string} eventName The event name.
     * @param {function} callback The callback function if async.
     */
    value: function addEvent(eventName, callback) {
      if (!eventListeners.has(eventName)) {
        eventListeners.set(eventName, new Listeners());
      }
      if (callback) {
        callback();
      }
    }

    /**
     * @function containsEvent Returns if the system contains the event by name.
     * @param {string} eventName The event name.
     * @param {function} callback The callback function if async.
     */

  }, {
    key: "containsEvent",
    value: function containsEvent(eventName, callback) {
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

  }, {
    key: "removeEvent",
    value: function removeEvent(eventName, callback) {
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

  }, {
    key: "clear",
    value: function clear(callback) {
      eventListeners.clear();
      if (callback) {
        callback();
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(eventName, listener, callback) {
      if (eventListeners.has(eventName)) {
        var listeners = eventListeners.get(eventName);
        if (!listeners.hasListener(listener.id)) {
          listeners.addListener(listener);
        }
      }
      if (callback) {
        callback();
      }
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(eventName, listenerId, callback) {
      if (eventListeners.has(eventName)) {
        var listeners = eventListeners.get(eventName);
        if (listeners.hasListener(listenerId)) {
          listeners.removeListener(listenerId);
        }
      }
      if (callback) {
        callback();
      }
    }
  }, {
    key: "throwEvent",
    value: function throwEvent(event) {
      if (event && event.id) {
        if (eventListeners.has(event.id)) {
          var listeners = eventListeners.get(event.id);
          listeners.notify(event);
        }
      } else {
        throw new Error("Event must not be null and have an ID!");
      }
    }
  }, {
    key: "createListener",
    value: function createListener(id, callback) {
      return new EventListener(id, callback);
    }
  }]);

  return Stateless;
}();

var initializer = getInstance();

module.exports = initializer;