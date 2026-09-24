(function registerYearStamp(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.YearStamp = class YearStamp extends Component {
  constructor({ root = document, selector = "[data-year]", clock = () => new Date() } = {}) {
    super(root);
    this.selector = selector;
    this.clock = clock;
  }

  init() {
    const year = String(this.clock().getFullYear());
    this.queryAll(this.selector).forEach((element) => {
      element.textContent = year;
    });
    return this;
  }
};
})(window);
