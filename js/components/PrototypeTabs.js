(function registerPrototypeTabs(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.PrototypeTabs = class PrototypeTabs extends Component {
  constructor(views, {
    root = document,
    tabSelector = "[data-prototype-tab]",
    panelSelector = "[data-prototype-panel]",
    titleSelector = "[data-panel-title]",
    triggerSelector = "[data-open-prototype]",
  } = {}) {
    super(root);
    this.views = new Map(views.map((view) => [view.id, view]));
    this.tabs = this.queryAll(tabSelector);
    this.panels = this.queryAll(panelSelector);
    this.title = this.query(titleSelector);
    this.triggers = this.queryAll(triggerSelector);
  }

  init() {
    if (!this.tabs.length || !this.panels.length) return this;

    this.tabs.forEach((tab) => {
      const isActive = tab.classList.contains("is-active");
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      this.listen(tab, "click", () => this.open(tab.dataset.prototypeTab));
      this.listen(tab, "keydown", (event) => this.handleKeydown(event));
    });

    this.triggers.forEach((trigger) => {
      this.listen(trigger, "click", () => this.open(trigger.dataset.openPrototype));
    });
    return this;
  }

  open(viewId, { focusTab = false } = {}) {
    const view = this.views.get(viewId);
    if (!view) return;

    this.tabs.forEach((tab) => {
      const isActive = tab.dataset.prototypeTab === view.id;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      if (isActive && focusTab) tab.focus();
    });

    this.panels.forEach((panel) => {
      const isActive = panel.dataset.prototypePanel === view.id;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    if (this.title) this.title.textContent = view.title;
  }

  handleKeydown(event) {
    const currentIndex = this.tabs.indexOf(event.currentTarget);
    if (currentIndex < 0) return;

    const navigation = {
      ArrowRight: (currentIndex + 1) % this.tabs.length,
      ArrowLeft: (currentIndex - 1 + this.tabs.length) % this.tabs.length,
      Home: 0,
      End: this.tabs.length - 1,
    };
    const nextIndex = navigation[event.key];
    if (nextIndex === undefined) return;
    event.preventDefault();
    this.open(this.tabs[nextIndex].dataset.prototypeTab, { focusTab: true });
  }
};
})(window);
