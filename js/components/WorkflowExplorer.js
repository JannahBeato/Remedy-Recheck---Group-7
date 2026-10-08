(function registerWorkflowExplorer(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;
const { WorkflowDetailView } = components;

components.WorkflowExplorer = class WorkflowExplorer extends Component {
  constructor(steps, {
    root = document,
    buttonSelector = "[data-workflow-step]",
    detailSelector = "[data-workflow-detail]",
  } = {}) {
    super(root);
    this.steps = new Map(steps.map((step) => [step.id, step]));
    this.buttons = this.queryAll(buttonSelector);
    this.detailView = new WorkflowDetailView(this.query(detailSelector));
  }

  init() {
    if (!this.buttons.length || !this.detailView.isAvailable) return this;
    this.buttons.forEach((button) => {
      this.listen(button, "click", () => this.open(button.dataset.workflowStep));
    });
    return this;
  }

  open(stepId) {
    const step = this.steps.get(stepId);
    if (!step) return;

    this.buttons.forEach((button) => {
      const isActive = button.dataset.workflowStep === step.id;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    this.detailView.render(step);
  }
};
})(window);
