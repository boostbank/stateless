class Listeners {
  constructor() {
    this.listeners = [];
  }

  addListener(listener) {
    if (listener && listener.id) {
      if (!this.hasListener(listener.id)) {
        this.listeners.push(listener);
      }
    }
  }

  removeListener(id) {
    for (let i = 0; i < this.listeners.length; i++) {
      const listener = this.listeners[i];
      if (id === listener.id) {
        this.listeners.splice(i, 1);
        i = this.listeners.length;
      }
    }
  }

  notify(event) {
    for (let i = 0; i < this.listeners.length; i++) {
      const listener = this.listeners[i];
      listener.eventCallback(event);
    }
  }

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
