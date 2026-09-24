(function registerProtectionDialog(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.ProtectionDialog = class ProtectionDialog extends Component {
  init() {
    this.dialog = this.query("[data-protection-dialog]");
    this.trigger = this.query("[data-protection-open]");
    if (!this.dialog || !this.trigger) return this;

    this.listen(this.trigger, "click", () => this.open());
    this.queryAll("[data-protection-close]").forEach((button) => {
      this.listen(button, "click", () => this.close());
    });
    this.listen(this.dialog, "click", (event) => {
      if (event.target === this.dialog) this.close();
    });
    return this;
  }

  open() {
    if (typeof this.dialog.showModal === "function") this.dialog.showModal();
    else this.dialog.setAttribute("open", "");
  }

  close() {
    if (!this.dialog?.hasAttribute("open")) return;
    if (typeof this.dialog.close === "function") this.dialog.close();
    else this.dialog.removeAttribute("open");
  }

  destroy() {
    this.close();
    super.destroy();
  }
};
})(window);
