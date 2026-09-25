(function registerCaseDetail(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;
const { CaseDetailView } = components;

components.CaseDetail = class CaseDetail extends Component {
  constructor(store, onOpenRecheck, { root = document, view = new CaseDetailView() } = {}) {
    super(root);
    this.store = store;
    this.onOpenRecheck = onOpenRecheck;
    this.view = view;
    this.currentCase = null;
  }

  init() {
    this.container = this.query("[data-case-detail]");
    if (!this.container) return this;

    this.listen(this.container, "click", (event) => {
      const trigger = event.target.closest("[data-record-recheck]");
      if (trigger && this.currentCase) this.onOpenRecheck(this.currentCase);
    });
    this.track(this.store.subscribe(({ selectedCase }) => this.render(selectedCase)));
    return this;
  }

  render(supplierCase) {
    this.currentCase = supplierCase;
    this.view.render(this.container, supplierCase);
  }
};
})(window);
