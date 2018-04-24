'use strict'

const HashMap = require('hashmap');
const eventListeners = new HashMap();

class Stateless{

    /**
     * @function addEvent Adds an event to the listeners set.
     * @param {string} eventName The event name.
     */
    addEvent(eventName){
        if(!eventListeners.has(eventName)){
            eventListeners.set(eventName,[]);
        }
    }

    containsEvent(eventName){
        return eventListeners.has(eventName);
    }

}

var initializer = function(){
    return new Stateless();
}

module.exports = initializer;