"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Listeners
 */
var Listeners = function () {
  /**
   * @constructor Creates a Listeners object.
   */
  function Listeners() {
    _classCallCheck(this, Listeners);

    this.listeners = [];
  }

  /**
   * @function addListener Adds a listener.
   * @param {listener} listener
   */


  _createClass(Listeners, [{
    key: "addListener",
    value: function addListener(listener) {
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

  }, {
    key: "removeListener",
    value: function removeListener(id) {
      for (var i = 0; i < this.listeners.length; i++) {
        var listener = this.listeners[i];
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

  }, {
    key: "notify",
    value: function notify(event) {
      for (var i = 0; i < this.listeners.length; i++) {
        var listener = this.listeners[i];
        listener.eventCallback(event);
      }
    }

    /**
     * @function hasListener Checks if listener exists.
     * @param {string} id
     */

  }, {
    key: "hasListener",
    value: function hasListener(id) {
      var hasListener = false;

      for (var i = 0; i < this.listeners.length; i++) {
        var listener = this.listeners[i];
        hasListener = listener.id === id;
        if (hasListener) {
          i = this.listeners.length;
        }
      }

      return hasListener;
    }
  }]);

  return Listeners;
}();

module.exports = Listeners;