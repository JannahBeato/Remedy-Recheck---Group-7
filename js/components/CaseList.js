(function registerCaseList(global) {
const { components, core, services } = global.RemedyRecheck;
const { Component } = core;
const { DateFormatter } = services;

components.CaseList = class CaseList extends Component {
  constructor(store, root = document) {
    super(root);
    this.store = store;
    this.dates = new DateFormatter();
  }

  init() {
    this.container = this.query("[data-case-list]");
    this.count = this.query("[data-case-count]");
    if (!this.container) return this;
    this.listen(this.container, "click", (event) => {
      const button = event.target.closest("[data-case-id]");
      if (button) this.store.selectCase(button.dataset.caseId);
    });
    this.track(this.store.subscribe((snapshot) => this.render(snapshot)));
    return this;
  }

  render({ filteredCases, selectedCase }) {
    if (this.count) this.count.textContent = `${filteredCases.length} ${filteredCases.length === 1 ? "case" : "cases"}`;
    if (!filteredCases.length) {
      const empty = document.createElement("p");
      empty.className = "rr-case-empty";
      empty.textContent = "No cases match these filters.";
      this.container.replaceChildren(empty);
      return;
    }

    const rows = filteredCases.map((supplierCase) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `rr-case-row${selectedCase?.id === supplierCase.id ? " is-selected" : ""}`;
      button.dataset.caseId = supplierCase.id;
      button.setAttribute("aria-pressed", String(selectedCase?.id === supplierCase.id));

      const top = document.createElement("span");
      top.className = "rr-case-row-top";
      const id = document.createElement("small");
      id.textContent = supplierCase.id;
      const status = document.createElement("span");
      status.className = `rr-status rr-status-${supplierCase.statusTone}`;
      status.textContent = supplierCase.statusLabel;
      top.append(id, status);

      const supplier = document.createElement("strong");
      supplier.textContent = supplierCase.supplier;
      const category = document.createElement("span");
      category.className = "rr-case-category";
      category.textContent = `${supplierCase.issueCategory} · ${supplierCase.location}`;
      const due = document.createElement("small");
      due.className = "rr-case-due";
      due.textContent = `Next due ${this.dates.format(supplierCase.nextDueDate)}`;
      button.append(top, supplier, category, due);
      return button;
    });

    this.container.replaceChildren(...rows);
  }
};
})(window);
