(function registerCaseQuery(global) {
const { models } = global.RemedyRecheck;

models.CaseQuery = class CaseQuery {
  constructor({ search = "", status = "all", category = "all" } = {}) {
    this.search = search.trim().toLowerCase();
    this.status = status;
    this.category = category;
  }

  apply(cases) {
    return cases
      .filter((supplierCase) => {
        const matchesSearch = !this.search || supplierCase.searchText.includes(this.search);
        const matchesStatus = this.status === "all"
          || (this.status === "follow_up" && supplierCase.needsFollowUp)
          || supplierCase.outcomeStatus === this.status;
        const matchesCategory = this.category === "all" || supplierCase.issueCategory === this.category;
        return matchesSearch && matchesStatus && matchesCategory;
      })
      .sort((firstCase, secondCase) => this.compareByDueDate(firstCase, secondCase));
  }

  compareByDueDate(firstCase, secondCase) {
    const lastDate = "9999-12-31";
    const firstDueDate = /^\d{4}-\d{2}-\d{2}$/.test(firstCase.nextDueDate) ? firstCase.nextDueDate : lastDate;
    const secondDueDate = /^\d{4}-\d{2}-\d{2}$/.test(secondCase.nextDueDate) ? secondCase.nextDueDate : lastDate;
    return firstDueDate.localeCompare(secondDueDate) || firstCase.id.localeCompare(secondCase.id);
  }
};
})(window);
