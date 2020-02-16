export class Subscribe {
  constructor() {
    // scroll event subscribers callbacks
    this.subscribers = {};
  }

  callSubscribers = (...args) => {
    // call all listeners

    Object.keys(this.subscribers).forEach(subscriber => {
      this.subscribers[subscriber](...args);
    });
  };

  subscribe = (key, callback) => {
    this.subscribers[key] = callback;
  };
  unsubscribe = (key) => {
    delete this.subscribers[key];
  }
}
