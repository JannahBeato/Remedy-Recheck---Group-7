(function registerAuthenticationShell(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;
const { LoginView } = components;

components.AuthenticationShell = class AuthenticationShell extends Component {
  constructor(authService, workspaceFactory, root = document) {
    super(root);
    this.authService = authService;
    this.workspaceFactory = workspaceFactory;
    this.workspaceApplication = null;
    this.loginView = new LoginView((email, password) => this.authenticate(email, password), root);
  }

  init() {
    this.workspace = this.query("[data-workspace-view]");
    this.workspaceHeading = this.query("[data-workspace-heading]");
    this.loginView.init();
    this.queryAll("[data-sign-out]").forEach((button) => {
      this.listen(button, "click", () => this.signOut());
    });

    const user = this.authService.currentUser();
    if (user) this.showWorkspace(user, { focus: false });
    else this.showLogin({ focus: false });
    return this;
  }

  authenticate(email, password) {
    const user = this.authService.signIn(email, password);
    if (!user) return null;
    this.showWorkspace(user);
    return user;
  }

  showWorkspace(user, { focus = true } = {}) {
    this.loginView.hide();
    this.workspace.hidden = false;
    this.queryAll("[data-auth-user-name]").forEach((element) => { element.textContent = user.name; });
    this.queryAll("[data-auth-user-role]").forEach((element) => { element.textContent = user.role; });

    if (!this.workspaceApplication) {
      this.workspaceApplication = this.workspaceFactory();
      this.workspaceApplication.start();
    }

    if (focus) global.requestAnimationFrame(() => this.workspaceHeading?.focus());
  }

  showLogin({ focus = true } = {}) {
    if (this.workspaceApplication) {
      this.workspaceApplication.stop();
      this.workspaceApplication = null;
    }
    if (this.workspace) this.workspace.hidden = true;
    this.loginView.show({ focus });
  }

  signOut() {
    this.authService.signOut();
    this.showLogin();
  }

  destroy() {
    if (this.workspaceApplication) this.workspaceApplication.stop();
    this.loginView.destroy();
    super.destroy();
  }
};
})(window);
