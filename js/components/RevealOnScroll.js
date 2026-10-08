(function registerRevealOnScroll(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.RevealOnScroll = class RevealOnScroll extends Component {
  constructor({ root = document, selector = ".reveal", threshold = 0.1 } = {}) {
    super(root);
    this.selector = selector;
    this.threshold = threshold;
  }

  init() {
    const elements = this.queryAll(this.selector);
    if (!elements.length) return this;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: this.threshold });

    elements.forEach((element) => {
      element.classList.add("is-reveal-ready");
      observer.observe(element);
    });
    this.track(() => observer.disconnect());
    return this;
  }
};
})(window);
