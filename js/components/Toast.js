(function registerToast(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.Toast = class Toast extends Component {
  init() {
    this.toast = this.query("[data-toast]");
    this.listen(document, "recheck:saved", (event) => {
      this.show(`${event.detail.id} was updated and added to the audit history.`);
    });
    return this;
  }

  show(message) {
    if (!this.toast) return;
    global.clearTimeout(this.timer);
    this.toast.textContent = message;
    this.toast.classList.add("is-visible");
    this.timer = global.setTimeout(() => this.toast.classList.remove("is-visible"), 4200);
  }

  destroy() {
    global.clearTimeout(this.timer);
    super.destroy();
  }
};
})(window);
