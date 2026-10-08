(function registerPublicMetrics(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.PublicMetrics = class PublicMetrics extends Component {
  constructor(repository, metricsService, {
    root = document,
    fallback = { active: 8, fixesRecorded: 8, rechecked: 6, needsFollowUp: 3 },
  } = {}) {
    super(root);
    this.repository = repository;
    this.metricsService = metricsService;
    this.fallback = Object.freeze({ ...fallback });
  }

  init() {
    this.metricNodes = this.queryAll("[data-public-metric]");
    this.noteNodes = this.queryAll("[data-public-note]");
    if (!this.metricNodes.length) return this;

    this.render();
    this.listen(global, "pageshow", () => this.render());
    this.listen(global, "storage", (event) => {
      if (event.key === this.repository.storageKey) this.render();
    });
    this.listen(document, "visibilitychange", () => {
      if (document.visibilityState === "visible") this.render();
    });
    return this;
  }

  readMetrics() {
    const records = this.repository.findAll();
    return records ? this.metricsService.calculate(records) : this.fallback;
  }

  render() {
    const metrics = this.readMetrics();
    this.metricNodes.forEach((node) => {
      const value = metrics[node.dataset.publicMetric];
      if (Number.isFinite(value)) node.textContent = String(value);
    });

    this.noteNodes.forEach((node) => {
      const value = metrics[node.dataset.publicNote];
      const percentage = metrics.active ? Math.round((value / metrics.active) * 100) : 0;
      node.textContent = `${percentage}% of active cases`;
    });
  }
};
})(window);
