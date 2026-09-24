(function registerAppMetrics(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.AppMetrics = class AppMetrics extends Component {
  constructor(store, metricsService, root = document) {
    super(root);
    this.store = store;
    this.metricsService = metricsService;
  }

  init() {
    this.container = this.query("[data-app-metrics]");
    if (!this.container) return this;
    this.track(this.store.subscribe(({ cases }) => this.render(cases)));
    return this;
  }

  render(cases) {
    const metrics = this.metricsService.calculate(cases);
    const definitions = [
      ["Active cases", metrics.active, "Poland supplier follow-up"],
      ["Fixes recorded", metrics.fixesRecorded, "Corrective action complete"],
      ["Outcomes rechecked", metrics.rechecked, "Later result reviewed"],
      ["Need follow-up", metrics.needsFollowUp, "Decision and owner visible"],
    ];

    const cards = definitions.map(([label, value, note]) => {
      const article = document.createElement("article");
      article.className = "rr-metric";
      const labelNode = document.createElement("span");
      labelNode.textContent = label;
      const valueNode = document.createElement("strong");
      valueNode.textContent = value;
      const noteNode = document.createElement("small");
      noteNode.textContent = note;
      article.append(labelNode, valueNode, noteNode);
      return article;
    });
    this.container.replaceChildren(...cards);
  }
};
})(window);
