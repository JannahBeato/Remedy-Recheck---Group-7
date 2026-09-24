(function registerComponent(global) {
const { core } = global.RemedyRecheck;

core.Component = class Component {
  constructor(root = document) {
    this.root = root;
    this.disposers = [];
  }

  query(selector) {
    return this.root.querySelector(selector);
  }

  queryAll(selector) {
    return [...this.root.querySelectorAll(selector)];
  }

  listen(target, eventName, handler, options) {
    if (!target) return;
    target.addEventListener(eventName, handler, options);
    this.disposers.push(() => target.removeEventListener(eventName, handler, options));
  }

  track(disposer) {
    this.disposers.push(disposer);
  }

  init() {
    return this;
  }

  destroy() {
    this.disposers.splice(0).reverse().forEach((dispose) => dispose());
  }
};
})(window);
