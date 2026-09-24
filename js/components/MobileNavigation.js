(function registerMobileNavigation(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.MobileNavigation = class MobileNavigation extends Component {
  constructor({ root = document, toggleSelector = "[data-nav-toggle]", menuSelector = "[data-nav-links]" } = {}) {
    super(root);
    this.toggleButton = this.query(toggleSelector);
    this.menu = this.query(menuSelector);
    this.links = this.menu ? [...this.menu.querySelectorAll("a")] : [];
    this.handleToggle = this.toggle.bind(this);
    this.handleClose = this.close.bind(this);
  }

  init() {
    if (!this.toggleButton || !this.menu) return this;
    this.listen(this.toggleButton, "click", this.handleToggle);
    this.links.forEach((link) => this.listen(link, "click", this.handleClose));
    return this;
  }

  toggle() {
    this.setOpen(this.toggleButton.getAttribute("aria-expanded") !== "true");
  }

  close() {
    this.setOpen(false);
  }

  setOpen(isOpen) {
    this.toggleButton.setAttribute("aria-expanded", String(isOpen));
    this.menu.classList.toggle("is-open", isOpen);
  }
};
})(window);
