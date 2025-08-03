export default class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);
  }

  emit(eventName, ...args) {
    if (!this.events.has(eventName)) {
      return;
    }
    this.events.get(eventName).forEach((callback) => callback(...args));
  }
}

const eventBus = new EventBus();

eventBus.on("test", (...args) => {
  console.log("test", ...args);
});

eventBus.emit("test", 1, 2, 3);