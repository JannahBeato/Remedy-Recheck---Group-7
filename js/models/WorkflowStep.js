(function registerWorkflowStep(global) {
const { models } = global.RemedyRecheck;

models.WorkflowStep = class WorkflowStep {
  constructor({ id, label, title, description }) {
    if (!id) throw new TypeError("WorkflowStep requires an id.");
    this.id = id;
    this.label = label;
    this.title = title;
    this.description = description;
    Object.freeze(this);
  }
};
})(window);
