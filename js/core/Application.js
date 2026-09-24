(function registerApplication(global) {
const { core } = global.RemedyRecheck;

core.Application = class Application {
  constructor(components = []) {
    this.components = [...components];
    this.started = false;
  }

  start() {
    if (this.started) return this;
    this.components.forEach((component) => component.init());
    this.started = true;
    return this;
  }

  stop() {
    if (!this.started) return this;
    [...this.components].reverse().forEach((component) => component.destroy?.());
    this.started = false;
    return this;
  }
};
})(window);
