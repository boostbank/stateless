"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class EventListener
 */
var EventListener =
/**
 * @constructor
 * @param {string} id Unique identifier for the listener.
 * @param {function} eventCallback The event callback.
 */
function EventListener(id, eventCallback) {
  _classCallCheck(this, EventListener);

  this.id = id;
  this.eventCallback = eventCallback;
};

module.exports = EventListener;