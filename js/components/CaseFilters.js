(function registerCaseFilters(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.CaseFilters = class CaseFilters extends Component {
  constructor(store, root = document) {
    super(root);
    this.store = store;
  }

  init() {
    this.search = this.query("[data-case-search]");
    this.status = this.query("[data-status-filter]");
    this.category = this.query("[data-category-filter]");
    if (!this.search || !this.status || !this.category) return this;

    this.populateCategories(this.store.snapshot().cases);
    this.search.value = "";
    this.status.value = "all";
    this.category.value = "all";
    this.listen(this.search, "input", () => this.update());
    this.listen(this.status, "change", () => this.update());
    this.listen(this.category, "change", () => this.update());
    return this;
  }

  populateCategories(cases) {
    this.category.querySelectorAll("option:not([value='all'])").forEach((option) => option.remove());
    const categories = [...new Set(cases.map((item) => item.issueCategory))].sort();
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      this.category.append(option);
    });
  }

  update() {
    this.store.setFilters({
      search: this.search.value,
      status: this.status.value,
      category: this.category.value,
    });
  }
};
})(window);
