(function registerWorkflowDetailView(global) {
const { components } = global.RemedyRecheck;

components.WorkflowDetailView = class WorkflowDetailView {
  constructor(element) {
    this.element = element;
  }

  get isAvailable() {
    return Boolean(this.element);
  }

  render(step) {
    if (!this.element || !step) return;

    const headingGroup = document.createElement("div");
    const label = this.createElement("p", "detail-label", step.label);
    const title = this.createElement("h3", "", step.title);
    const description = this.createElement("p", "", step.description);

    headingGroup.append(label, title);
    this.element.replaceChildren(headingGroup, description);
  }

  createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }
};
})(window);
