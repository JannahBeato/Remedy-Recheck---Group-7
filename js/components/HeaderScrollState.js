(function registerHeaderScrollState(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.HeaderScrollState = class HeaderScrollState extends Component {
  constructor({ root = document, selector = "[data-header]", threshold = 12 } = {}) {
    super(root);
    this.header = this.query(selector);
    this.threshold = threshold;
    this.handleScroll = this.update.bind(this);
  }

  init() {
    if (!this.header) return this;
    this.update();
    this.listen(window, "scroll", this.handleScroll, { passive: true });
    return this;
  }

  update() {
    this.header.classList.toggle("is-scrolled", window.scrollY > this.threshold);
  }
};
})(window);
