(function registerLoginView(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.LoginView = class LoginView extends Component {
  constructor(onAuthenticate, root = document) {
    super(root);
    this.onAuthenticate = onAuthenticate;
  }

  init() {
    this.container = this.query("[data-login-view]");
    this.form = this.query("[data-login-form]");
    this.email = this.query("[data-login-email]");
    this.password = this.query("[data-login-password]");
    this.error = this.query("[data-login-error]");
    this.toggle = this.query("[data-password-toggle]");
    if (!this.container || !this.form) return this;

    this.listen(this.form, "submit", (event) => this.submit(event));
    this.listen(this.toggle, "click", () => this.togglePassword());
    this.listen(this.email, "input", () => this.clearError());
    this.listen(this.password, "input", () => this.clearError());
    return this;
  }

  submit(event) {
    event.preventDefault();
    this.clearError();
    const user = this.onAuthenticate(this.email.value, this.password.value);
    if (user) {
      this.password.value = "";
      return;
    }

    this.error.textContent = "The email or password is incorrect.";
    this.password.focus();
    this.password.select();
  }

  togglePassword() {
    const isVisible = this.password.type === "text";
    this.password.type = isVisible ? "password" : "text";
    this.toggle.setAttribute("aria-pressed", String(!isVisible));
    this.toggle.textContent = isVisible ? "Show" : "Hide";
    this.password.focus();
  }

  show({ focus = true } = {}) {
    if (!this.container) return;
    this.container.hidden = false;
    this.form.reset();
    this.password.type = "password";
    this.toggle.setAttribute("aria-pressed", "false");
    this.toggle.textContent = "Show";
    this.clearError();
    if (focus) global.requestAnimationFrame(() => this.email.focus());
  }

  hide() {
    if (this.container) this.container.hidden = true;
  }

  clearError() {
    if (this.error) this.error.textContent = "";
  }
};
})(window);
