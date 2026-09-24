(function registerPrototypeTabs(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.PrototypeTabs = class PrototypeTabs extends Component {
  constructor(views, {
    root = document,
    tabSelector = "[data-prototype-tab]",
    panelSelector = "[data-prototype-panel]",
    titleSelector = "[data-panel-title]",
    requirementsButtonSelector = "[data-open-requirements]",
  } = {}) {
    super(root);
    this.views = new Map(views.map((view) => [view.id, view]));
    this.tabs = this.queryAll(tabSelector);
    this.panels = this.queryAll(panelSelector);
    this.title = this.query(titleSelector);
    this.requirementsButton = this.query(requirementsButtonSelector);
  }

  init() {
    if (!this.tabs.length || !this.panels.length) return this;

    this.tabs.forEach((tab) => {
      tab.setAttribute("aria-pressed", String(tab.classList.contains("is-active")));
      this.listen(tab, "click", () => this.open(tab.dataset.prototypeTab));
    });

    this.listen(this.requirementsButton, "click", () => this.open("requirements"));
    return this;
  }

  open(viewId) {
    const view = this.views.get(viewId);
    if (!view) return;

    this.tabs.forEach((tab) => {
      const isActive = tab.dataset.prototypeTab === view.id;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-pressed", String(isActive));
    });

    this.panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.prototypePanel === view.id);
    });

    if (this.title) this.title.textContent = view.title;
  }
};
})(window);
