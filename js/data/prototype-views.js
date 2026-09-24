(function registerPrototypeData(global) {
const { data, models } = global.RemedyRecheck;
const { PrototypeView } = models;

data.prototypeViews = Object.freeze([
  new PrototypeView({ id: "signin", title: "Protected sign-in" }),
  new PrototypeView({ id: "review", title: "Due-date case review" }),
  new PrototypeView({ id: "protection", title: "Data protection" }),
]);
})(window);
