(function registerPrototypeData(global) {
const { data, models } = global.RemedyRecheck;
const { PrototypeView } = models;

data.prototypeViews = Object.freeze([
  new PrototypeView({ id: "overview", title: "Follow-up overview" }),
  new PrototypeView({ id: "requirements", title: "Data requirements" }),
  new PrototypeView({ id: "guardrails", title: "Safety guardrails" }),
]);
})(window);
