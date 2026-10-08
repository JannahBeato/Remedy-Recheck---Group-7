(function registerCaseStore(global) {
const { models, state } = global.RemedyRecheck;
const { CaseQuery } = models;

state.CaseStore = class CaseStore {
  constructor(repository) {
    this.repository = repository;
    this.cases = repository.findAll();
    this.filters = { search: "", status: "all", category: "all" };
    this.selectedCaseId = new CaseQuery(this.filters).apply(this.cases)[0]?.id || null;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.snapshot());
    return () => this.listeners.delete(listener);
  }

  setFilters(changes) {
    this.filters = { ...this.filters, ...changes };
    const visible = this.filteredCases;
    if (visible.length && !visible.some((item) => item.id === this.selectedCaseId)) {
      this.selectedCaseId = visible[0].id;
    }
    this.notify();
  }

  selectCase(caseId) {
    if (!this.cases.some((item) => item.id === caseId)) return;
    this.selectedCaseId = caseId;
    this.notify();
  }

  recordRecheck(caseId, record) {
    const current = this.cases.find((item) => item.id === caseId);
    if (!current) throw new Error(`Case ${caseId} was not found.`);
    const updated = this.repository.save(current.withRecheck(record));
    this.cases = this.cases.map((item) => item.id === updated.id ? updated : item);
    this.selectedCaseId = updated.id;
    this.notify();
    return updated;
  }

  get filteredCases() {
    return new CaseQuery(this.filters).apply(this.cases);
  }

  get selectedCase() {
    const visibleCases = this.filteredCases;
    return visibleCases.find((item) => item.id === this.selectedCaseId) || visibleCases[0] || null;
  }

  snapshot() {
    return Object.freeze({
      cases: [...this.cases],
      filteredCases: [...this.filteredCases],
      selectedCase: this.selectedCase,
      filters: { ...this.filters },
    });
  }

  notify() {
    const snapshot = this.snapshot();
    this.listeners.forEach((listener) => listener(snapshot));
  }
};
})(window);
